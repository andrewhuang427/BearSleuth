const express = require("express");
const usermodel = require("../models/UserModel");
const jobModel = require("../models/JobModel");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
var fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JobModel = require("../models/JobModel");
require("dotenv").config();

app.post("/login", async (request, response) => {
  data = request.body;
  query = usermodel.findOne({ username: data.username }, function (err, user) {
    if (err) return err;
    if (user == null) {
      ret = { message: "User Does not Exist", success: false };
      response.json(ret);
    } else {
      bcrypt.compare(data.password, user.hash).then((result) => {
        console.log(result);
        if (result) {
          const username = data.username;
          const user = { name: username };
          console.log(user.name);
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
          response.json({
            message: "Logged in Successfully",
            accessToken: accessToken,
            success: true,
          });
        } else {
          ret = { message: "Incorrect Password", success: false };
          response.json(ret);
        }
      });
    }
  });
});

function authenticateToken(req, res, next) {
  token = req.body.accessToken;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/users", async (req, res) => {
  var query = usermodel.find();
  query.select("-_id");
  query.exec(function (err, users) {
    if (err) return err;
    res.send(users);
  });
});

app.post("/register", async (request, response) => {
  console.log("test");
  data = request.body;
  console.log(data);
  query = usermodel.exists({ username: data.username }, function (err, user) {
    if (err) return err;
    if (user == null) {
      salt = bcrypt.genSaltSync(10);
      bcrypt.hash(data.password, salt).then((result) => {
        query = usermodel.create(
          {
            username: data.username,
            email: data.email,
            hash: result,
            major: data.major,
            desiredRole: data.role,
            desiredLocation: data.location,
            friends: [],
          },
          function (err) {
            if (err) return err;
            ret = { message: "Registration Successful", success: true };
            response.json(ret);
          }
        );
      });
    } else {
      ret = { message: "User Already Exists", success: false };
      response.json(ret);
    }
  });
});

app.post("/getJobsByTitle", async (request, response) => {
  data = request.body;
  query = jobModel.find(
    { position: { $regex: data.roleName, $options: "i" } },
    function (err, jobs) {
      if (err) return err;
      console.log(jobs.length);
      console.log(jobs[0]);

      ret = { values: jobs, success: true };
      response.json(ret);
    }
  );
});

app.post("/getJobsByCompany", async (request, response) => {
  data = request.body;
  query = jobModel.find({ company: data.companyName }, function (err, jobs) {
    if (err) return err;
    console.log(jobs.length);
    console.log(jobs[0]);

    ret = { values: jobs, success: true };
    console.log(ret.values[0]);

    response.json(ret);
  });
});

app.post("/addFriend", async (request, response) => {
  data = request.body;
  console.log(data);
  query = usermodel.updateOne(
    { username: data.username },
    { $push: { friends: data.new } },
    function (err, users) {
      if (err) {
        return err;
      } else {
        console.log(users);
        ret = { success: true };
        response.json(ret);
      }
    }
  );
});
app.post("/addHistory", async (request, response) => {
  data = request.body;
  //console.log(data);
  query = usermodel.updateOne(
    { username: data.username },
    { $push: { history: data.jobVisited } },
    function (err, users) {
      if (err) {
        return err;
      } else {
        ret = { success: true };
        response.json(ret);
      }
    }
  );
});
app.post("/setFavorites", async (request, response) => {
  data = request.body;
  query = usermodel.updateOne(
    { username: data.user },
    { $set: {favorites: data.fav }},
    function (err, users) {
      if (err) {
        return err;
      } else {
        ret = { success: true };
        response.json(ret);
      }
    }
  );
});

app.post("/getHistory", async (request, response) => {
  data = request.body;
  console.log(data);
  query = usermodel.find(
    { username: { $regex: data.username } },
    function (err, jobs) {
      if (err) return err;
      ret = { values: jobs, success: true };
      response.json(ret);
    }
  );
});
app.post("/getRecs", async (request, response) => {
  data = request.body;
  console.log(data);
  query = jobModel.find(
    { position: { $regex: data.role } },
    function (err, jobs) {
      if (err) return err;
      ret = { values: jobs, success: true };
      response.json(ret);
    }
  );
});

app.post("/getFriends", async (request, response) => {
  data = request.body;
  console.log(data.major);
  query = usermodel.find(
    { username: { $regex: data.username } },
    function (err, users) {
      if (err) return err;
      ret = { values: users, success: true };
      response.json(ret);
    }
  );
});

app.post("/getUsers", async (request, response) => {
  data = request.body;
  console.log(data.major);
  query = usermodel.find(
    { major: { $regex: data.major, $options: "i" } },
    function (err, users) {
      if (err) return err;
      console.log(users.length);
      console.log(users);

      ret = { values: users, success: true };
      response.json(ret);
    }
  );
});

//----------------------This is the real request, but turned off to save searches----------
// app.post("/getAPI", async (request, response) => {
//     data = (request.body);
//     const SerpApi = require('google-search-results-nodejs');
//     const search = new SerpApi.GoogleSearch("df6a71fa7a6e850a4c1c34e54e6dc4071c296cb642e6ae8082baac5cb4ab2114");
//     const params = {
//         engine: "google_jobs",
//         q: data.apiName,
//         gl: "us",
//         lrad: "20",
//     };
//     search.json(params, (result) => {
//         ret = { "values": result, "success": true }
//         response.json(ret)
//     });

// })

app.post("/getAPI", async (request, response) => {
  ret = { values: search, success: true };
  response.json(ret);
});

var search = {
  search_metadata: {
    id: "6171836d8ccee03d923a516d",
    status: "Success",
    json_endpoint:
      "https://serpapi.com/searches/0db88d4b9607b7d1/6171836d8ccee03d923a516d.json",
    created_at: "2021-10-21 15:12:45 UTC",
    processed_at: "2021-10-21 15:12:45 UTC",
    google_jobs_url:
      "https://www.google.com/search?q=Software+Intern+St.+Louisn&ibp=htl;jobs",
    raw_html_file:
      "https://serpapi.com/searches/0db88d4b9607b7d1/6171836d8ccee03d923a516d.html",
    total_time_taken: 6.07,
  },
  search_parameters: {
    q: "Software Intern St. Louisn",
    engine: "google_jobs",
    google_domain: "google.com",
  },
  jobs_results: [
    {
      title: "Software Engineer Intern -St. Louis Office",
      company_name: "Clayco",
      location: "St. Louis, MO",
      via: "via LinkedIn",
      description:
        'As a Software Engineer Intern, you will have the opportunity to experience a well-rounded view of IT infrastructure and operations. Under immediate direction, assigned duties will include working on various task and process related activity that contribute to overall business objectives for the Software Engineering, Enterprise Solutions, and Engineering teams. This position is located in St. Louis, MO.\n\nRequired Qualifications\n• Current college student or recent graduate with major in a Computer Science discipline from an accredited university\n• Responsible and willing to be accountable for duties and assignments\n• Entry level knowledge of programming and software development\n• Strong work ethic\n• Effective/professional written and verbal communication capabilities\n• Ability to carefully follow established procedures\n\nApplication Development Tasks and Objectives\n• Review and analyze existing code for optimization\n• New feature development\n• Bug fixing\n• Participate in full software... lifecycle development and deploy code to production\n• Performance monitoring\n• Document application process flows\n• JavaScript and NodeJS\n• Java and MuleSoft\n• Robotic Process Automation with Kofax Design Studio\n• Develop test plans\n\nAbout Us\n\nClayco is a full-service, turnkey real estate development, master planning, architecture, engineering and construction firm that safely delivers clients across North America the highest quality solutions on time, on budget, and above and beyond expectations. With $3.8 billion in revenue for 2020, Clayco specializes in the "art and science of building," providing fast track, efficient solutions for industrial, commercial, institutional and residential related building projects.\n\nWhy Clayco?\n\nBest Places to Work – Crain’s Chicago Business, St. Louis Business Journal\n\nENR – Top Midwest Contractors (#1), Top Design Build Contractors (#5), Top 400 Contractors (#24',
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRX4e7JNCH-6rCu4UZqiJlnRyj5670WgChYIOx3sM&s",
      extensions: ["Over 1 month ago", "Full-time"],
      detected_extensions: {
        posted_at: "Over 1 month ago",
        schedule_type: "Full-time",
      },
      job_id:
        "eyJqb2JfdGl0bGUiOiJTb2Z0d2FyZSBFbmdpbmVlciBJbnRlcm4gLVN0LiBMb3VpcyBPZmZpY2UiLCJodGlkb2NpZCI6Im9DMGVSLUlUdnFGNmE3UkVBQUFBQUE9PSIsImZjIjoiRXN3QkNvd0JRVTFzZG5Kd2RXczNNRE00Y1VsYVJXaEJiRGxCWWxjMFZqVnFYelo0TWpoWE5Vb3dkazA1TjNaZlpWOVJiV3RyV25SUVlsUnVVV0l4VGtKWVdETlRiVzFSVHpSWU9XaEVUVkJyWjFwd2JXUlJaRmRsUldSNGNqQkdTbFpyWkRKNFVHNWtWRWw2Vm1oaFlsVk1ZbFJ2ZUdSNVF6ZzBiME5uZDBkbVUybFpUMkZXV1VGdlN6Vk1Va2R5YUhNU0YyTnZUbmhaWVhWeVJHVkRiWEYwYzFBNVRVdE9MVUYzR2lKQlNGZFRUbTFXYzBaNVkzRmhkMFJTWTFsTlZtNDBla0V5TUVGMVVGaHRXV0YzIiwiZmN2IjoiMyIsImZjX2lkIjoiZmNfNyIsImFwcGx5X2xpbmsiOnsidGl0bGUiOiJBcHBseSBvbiBMaW5rZWRJbiIsImxpbmsiOiJodHRwczovL3d3dy5saW5rZWRpbi5jb20vam9icy92aWV3L3NvZnR3YXJlLWVuZ2luZWVyLWludGVybi1zdC1sb3Vpcy1vZmZpY2UtYXQtY2xheWNvLTI3NDMwNjkxMjM/dXRtX2NhbXBhaWduPWdvb2dsZV9qb2JzX2FwcGx5XHUwMDI2dXRtX3NvdXJjZT1nb29nbGVfam9ic19hcHBseVx1MDAyNnV0bV9tZWRpdW09b3JnYW5pYyJ9fQ==",
    },
    {
      title: "Software Engineering Intern - Summer 2022",
      company_name: "Affirm",
      location: "St. Louis, MO",
      via: "via LinkedIn",
      description:
        "Affirm is reinventing credit to make it more honest and friendly, giving consumers the flexibility to buy now and pay later without any hidden fees or compounding interest. Affirm, Inc. proudly includes Affirm, PayBright, and Returnly.\n\nAs an intern at Affirm, you will be a contributing member of our outstanding engineering team, and as such you will work on meaningful projects and frequently ship code. Recent grads and past interns have built a real-time high-throughput data processing pipeline, developed an extensive automated testing framework, and built out our proprietary financial platform that is central to our long term company mission.\n\nWe are excited to meet and consider strong students for our 12-16 week internships. We are a dynamic organization that is happy to tailor projects to your skillsets, and we will work with you throughout the interview process to determine which team will be best for you.\n\nWhat You'll Do\n• Interns are responsible for developing and shipping a... project and verifying that it works in production. Because things are changing fast at Affirm, we do not specify intern projects in advance, instead you will collaborate with your mentor and manager when you start to spec a project that will best contribute to your team.\n• You will ship code and monitor the deployment of your work. Our intern projects are not isolated or intended to be thrown away: your team will depend on your contributions!\n• We will pair you with a dedicated mentor who will be by your side to give advice and ensure the success of your project. You can expect to meet with them on a regular basis and receive feedback.\n• You'll have the opportunity to attend events with other interns and full-time Affirmers! Past events have included cable car trolley tours, scavenger hunts, and Giants games.\n• You will present your work to the entire engineering organization at the end of your internship.\nWhat We Look For\n• Passion and dedication to changing consumer banking for the better\n• Experience with Python, C/C++ or Java\n• Frontend experience in WebApps/JavaScript/AngularJS/React\n• Strong communication skills\n• Experience with object oriented programming\n• Deployment and testing frameworks\n• API development/documentation\n• AWS or other PaaS frameworks\n\nLocation - Remote U.S.\n\nAffirm is proud to be a remote-first company ! Employees in remote roles have the option of working remotely or from an Affirm office in their country of hire, and may occasionally travel to an Affirm office or elsewhere for required meetings or team-building events. Our offices in Chicago, New York, Pittsburgh, Salt Lake City, San Francisco and Toronto will remain operational and accessible for anyone to use on a voluntary basis, subject to local COVID-19 guidelines.\n\nIf you got this far, we hope you're feeling excited about this role. Even if you don't feel you meet every single requirement, we still encourage you to apply. We're eager to meet people who believe in Affirm's mission and can contribute to our team in a variety of ways—not just candidates who check all the boxes.\n\nInclusivity\n\nAt Affirm, People Come First is one of our core values, and that’s why diversity and inclusion are vital to our priorities as an equal opportunity employer. You can read about our D&I program here and our progress thus far in our 2020 DEI Report .\n\nWe also believe It’s On Us to provide an inclusive interview experience for all, including people with disabilities. We are happy to provide reasonable accommodations to candidates in need of individualized support during the hiring process.\n\nBy clicking \"Submit Application,\" you acknowledge that you have read the Affirm Employment Privacy Policy , or the Affirm Employment Privacy Notice (EU) for applicants applying from the European Union, and hereby freely and unambiguously give informed consent to the collection, processing, use, and storage of my personal information as described therein",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ82KfI8E5w_Na8YXZBgtjvMcDaOf4Y-pOef7iwUf8&s",
      extensions: ["19 hours ago", "Full-time"],
      detected_extensions: {
        posted_at: "19 hours ago",
        schedule_type: "Full-time",
      },
      job_id:
        "eyJqb2JfdGl0bGUiOiJTb2Z0d2FyZSBFbmdpbmVlcmluZyBJbnRlcm4gLSBTdW1tZXIgMjAyMiIsImh0aWRvY2lkIjoiZVZPTWVJS2JOcE5MSW5xeUFBQUFBQT09IiwiZmMiOiJFdUlCQ3FJQlFVMXNkbkp3Y3pCRU1IaEZaVTFZT1dWbVkyUlRSVTV0TWpoVWVHRm1UVWR0YW5WUkxVZG5Rek5zYTJSVk5EVkxhSEV0T0VadVltbFZRMHh1TjJKeldWbEZZakpmWm10aVgzaHROekJwTkRCSlZtNDBWVFkwWlRnM1VpMU5OM1Z5Y2toTmJ6VkxOazE2WTJONlRVSnFRVXRMWTNSSGJWbDVWVWRtZWxRMFpIRnlRVmRIVkVGNlZIVnBUV3RhZEVWWFNrZENjM0pUUkdoV1RWaG9UVU4wVG1GM0VoZGpiMDU0V1dGMWNrUmxRMjF4ZEhOUU9VMUxUaTFCZHhvaVFVaFhVMDV0VjBaRmQwNVFOMU5JTVRGVVNWb3lkemt5VFhGV2FtMDVORGN0VVEiLCJmY3YiOiIzIiwiZmNfaWQiOiJmY18xNSIsImFwcGx5X2xpbmsiOnsidGl0bGUiOiJBcHBseSBvbiBMaW5rZWRJbiIsImxpbmsiOiJodHRwczovL3d3dy5saW5rZWRpbi5jb20vam9icy92aWV3L3NvZnR3YXJlLWVuZ2luZWVyaW5nLWludGVybi1zdW1tZXItMjAyMi1hdC1hZmZpcm0tMjc1NzQzMzE3OT91dG1fY2FtcGFpZ249Z29vZ2xlX2pvYnNfYXBwbHlcdTAwMjZ1dG1fc291cmNlPWdvb2dsZV9qb2JzX2FwcGx5XHUwMDI2dXRtX21lZGl1bT1vcmdhbmljIn19",
    },
    {
      title: "Software Engineering Intern, Summer 2022",
      company_name: "Enterprise Holdings",
      location: "St. Louis, MO",
      via: "via Enterprise Career - Enterprise Rent-A-Car",
      description:
        "As an Intern within the IT Division, you will join a team and be tasked with developing an application from concept to implementation and/or work alongside our product teams to support real world production applications. You will have the opportunity to work first hand with a number of technologies and programming languages, many of which you will have the chance to research and select yourself.  As an Intern, you will have the great opportunity to work alongside a team of skilled engineers and help to create innovative business solutions for real world problems.\n\nKey Responsibilities:\n• Partner with Engineers and Architects to analyze requirements\n• Interpret requirements to create custom applications\n• Research and select technologies for building applications\n• Develop prototypes and perform application programming\n• Perform unit and integration testing\n\nEnterprise’s Technical Environment includes:\n• Java and Object Oriented Application Development\n• Agile Methodology\n• Web Site... and Mobile (iOS and Android) Development \n• Web Services\n\nEqual Opportunity Employer/Disability/Veterans",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9z-rO_yIJGaUR_xDKI7RtLz-nVgfNz0O6UBs&s=0",
      extensions: ["Over 1 month ago", "Full-time"],
      detected_extensions: {
        posted_at: "Over 1 month ago",
        schedule_type: "Full-time",
      },
      job_id:
        "eyJqb2JfdGl0bGUiOiJTb2Z0d2FyZSBFbmdpbmVlcmluZyBJbnRlcm4sIFN1bW1lciAyMDIyIiwiaHRpZG9jaWQiOiJaQWYxcXZZR1dDMG5MOUpjQUFBQUFBPT0iLCJmYyI6IkV2Y0JDcmNCUVUxc2RuSndkVWRwTlhsaGVYTkxTWGhZWkhSV1UwVmhhak5zV0ZadGNGVXRTM2RTWkc0MVFsbFpaVFpSWjA1dGIzcGFWMWxqTVMxVFVVa3pVVXhsU1hWbGVXdG9SVFYzT1ZSSExVSjJjVmRpTTFOa09IZEpUVjloT1hWT05YUjNObmRHUWxOSmEyZDZVMFpmVkdwU05rWklXRzVGVjAwek5rSllNVTlVUkhsWVZGazJZbEpYV1c1TU1pMUVkSEZKVlRkdFNXdHZVa28xVDNoS1NEbE1ja2xpTjJwUk5IWk9hMFUxYlMxaFpISnlUblpmTlVoWkVoZGpiMDU0V1dGMWNrUmxRMjF4ZEhOUU9VMUxUaTFCZHhvaVFVaFhVMDV0Vm1SV2RsQkJhR05PVFRSWGNDMWxOa0Y1TVdWQk5rUlFaMncyWnciLCJmY3YiOiIzIiwiZmNfaWQiOiJmY18yMyIsImFwcGx5X2xpbmsiOnsidGl0bGUiOiJBcHBseSBvbiBFbnRlcnByaXNlIENhcmVlciAtIEVudGVycHJpc2UgUmVudC1BLUNhciIsImxpbmsiOiJodHRwczovL2NhcmVlcnMuZW50ZXJwcmlzZS5jb20vam9iL3N0LWxvdWlzL3NvZnR3YXJlLWVuZ2luZWVyaW5nLWludGVybi1zdW1tZXItMjAyMi80MzAvMTk3MjkyOTU/dXRtX2NhbXBhaWduPWdvb2dsZV9qb2JzX2FwcGx5XHUwMDI2dXRtX3NvdXJjZT1nb29nbGVfam9ic19hcHBseVx1MDAyNnV0bV9tZWRpdW09b3JnYW5pYyJ9fQ==",
    },
    {
      title: "Intern - Software Developer - Summer 2022, CO or Remote (US)",
      company_name: "Lumen",
      location: "Anywhere",
      via: "via Snagajob",
      description:
        "Job Description\nABOUT LUMEN\n\nLumen is guided by our belief that humanity is at its best when technology advances the way we live and work. With 450,000 route fiber miles serving customers in more than 60 countries, we deliver the fastest, most secure global platform for applications and data to help businesses, government and communities deliver amazing experiences. Learn more about Lumen’s network, edge cloud, security and communication and collaboration solutions and our purpose to further human progress through technology at news.lumen.com, LinkedIn: /lumentechnologies, Twitter: @lumentechco, Facebook: /lumentechnologies, Instagram: @lumentechnologies and YouTube: /lumentechnologies.\n\nTHE ROLE\n\nLUMEN’S US INTERNSHIP PROGRAM IS A PATH FOR CAREER READINESS IN THE 4TH INDUSTRIAL REVOLUTION.\n\nBe a part of an internship program, driving human progress through technology. During a 10- week period our summer interns innovate and make an impact by transforming industries across the globe... and changing the world one connection at a time. Our interns are presented with real business challenges and provide solutions that make a difference across all areas of the company, all while learning the skills needed to successfully navigate the modern workplace.\n\nTHE EXPERIENCE\n\n- INNOVATE – to deliver solutions to real business problems\n- TRANSFORM – your skills and knowledge through challenging work projects\n- CONNECT – to our company and culture creating valuable connections with your intern peers, work team and leaders across the organization.\n- IMPACT – through Community & Social Involvement – collaborate with our ERGs to give back and make an impact in the communities Lumen serves.\n\nTHE MAIN RESPONSIBILITIES\n\nAs a Software Developer in our Strategic Planning and Transformation organization, the Intern will work collaboratively within our development team supporting our cloud-based workflow automation platform, ServiceNow. The intern candidate should have basic programming skills and familiarity with most industry standard programming languages to be successful working with this platform. You will need a high level of engagement and ability to take initiative, ask questions and work in a team environment.\n\n- Ability to grow platform and development skills by completing the web based ServiceNow platform training\n- Assist development team with supporting the service catalogue space\n- Develop service request forms for use in the platform\n- Ability to use dynamic and automated workflow tools within the platform\n\nWHAT WE LOOK FOR IN A CANDIDATE\n\n- EDUCATION REQUIREMENTS\n- In pursuit of degree in Computer Science or Computer Engineering, as a rising senior or master’s level education status at the start of the internship, graduating August 2022 – June 2023.\n- PROFICIENCY AND UNDERSTANDING OF\n- Understanding of basic developer principles and methodologies\n- Understanding of basic workflow and automation techniques\n- Some experience with programming and use of industry standard programming languages\n- Experience with ServiceNow a plus\n\n- PROFESSIONAL ATTRIBUTES\n- Strong drive for results and taking initiative\n- Ability to be resourceful and adaptable\n- Ability to collaborate and have agility while making effective decisions\n- Strong written and verbal communication skills\n- Ability to interact with business partners and drive the conversation.\n- Flexible and adapts well to change\n\n- WORK SETTING\n- Ideally the position will be in one of the following offices: Town & Country, MO (St. Louis area) or will consider remote/ work from home.\n- Intern must be able to work 30-40 hours be week during the 10-week program (June – August)\n- Intern must have reliable transportation to/from work location (Lumen does not provide transportation to/from Lumen office locations)\n- US work authorization required\n\nWHAT TO EXPECT NEXT\n\nAfter completion and submission of your application, you will be asked to participate in a virtual video interview. This on demand interview will be a way for Lumen to learn more about you and your experience as it aligns to the internship position. A separate email invitation will be sent to you (check your spam) within 6 hours of application. For continued consideration in the summer internship program, please ensure you complete the video interview within 5 business days of application. Thank you!\n\nRequisition #: 263092\n\nWhen applying for a position, you may be subject to a background screen (criminal records check, motor vehicle report, and/or drug screen), depending on the requirements for the position. Job-related concerns noted in the background screen may disqualify you from the new position or your current role. Background results will be evaluated on a case-by-case basis.\n\nEEO STATEMENT\nWe are committed to providing equal employment opportunities to all persons regardless of race, color, ancestry, citizenship, national origin, religion, veteran status, disability, genetic characteristic or information, age, gender, sexual orientation, gender identity, marital status, family status, pregnancy, or other legally protected status (collectively, “protected statuses”). We do not tolerate unlawful discrimination in any employment decisions, including recruiting, hiring, compensation, promotion, benefits, discipline, termination, job assignments or training.\n\nNOTE: Pursuant to the San Francisco Fair Chance Ordinance, we will consider for employment qualified applicants with arrest and conviction records.\n\nDISCLAIMER\nThe above job definition information has been designed to indicate the general nature and level of work performed by employees within this classification. It is not designed to contain or be interpreted as a comprehensive inventory of all duties, responsibilities, and qualifications required of employees assigned to this job. Job duties and responsibilities are subject to change based on changing business needs and conditions",
      extensions: ["5 days ago", "Work from home", "Full-time"],
      detected_extensions: {
        posted_at: "5 days ago",
        schedule_type: "Full-time",
        work_from_home: true,
      },
      job_id:
        "eyJqb2JfdGl0bGUiOiJJbnRlcm4gLSBTb2Z0d2FyZSBEZXZlbG9wZXIgLSBTdW1tZXIgMjAyMiwgQ08gb3IgUmVtb3RlIChVUykiLCJodGlkb2NpZCI6IlhWUk4ycGJ2YWdOSHJsQ1VBQUFBQUE9PSIsImZjIjoiRXN3QkNvd0JRVTFzZG5Kd2RraHlRa0l4WDBOSE1tSmhla3hhUmtoTmVFSlJSek5GYlRkNFJVMUNORFpYUkc1RlFWaE1UMHd6WVc5SFMzWjRiRFpYVnpZMVRHSXRVbTl3VlRZNFlXcHlOemhJVVdGRlRVMVlTbE50WDFKbVVtZHJWbFZNVEhwcVluTlJhbm8zTkRaWk1uRk5ObWxYY25BM1F6WnVWV055T0VGc0xXeDBhbVJKUkdkalJtNXFWM1l6YmprU0YyTnZUbmhaWVhWeVJHVkRiWEYwYzFBNVRVdE9MVUYzR2lKQlNGZFRUbTFWYURKdVNqTjFTWFE0TFVod1ZISjNhM051U3pFM2JVeGlTVmhSIiwiZmN2IjoiMyIsImZjX2lkIjoiZmNfMzEiLCJhcHBseV9saW5rIjp7InRpdGxlIjoiQXBwbHkgb24gU25hZ2Fqb2IiLCJsaW5rIjoiaHR0cHM6Ly93d3cuc25hZ2Fqb2IuY29tL2pvYnMvNjcxMDI4MzIxP3V0bV9jYW1wYWlnbj1nb29nbGVfam9ic19hcHBseVx1MDAyNnV0bV9zb3VyY2U9Z29vZ2xlX2pvYnNfYXBwbHlcdTAwMjZ1dG1fbWVkaXVtPW9yZ2FuaWMifX0=",
    },
    {
      title:
        "Intern (Application Software Developer Storage Undergraduate - Summer)",
      company_name: "Centene Corporation",
      location: "St. Louis, MO (+1 other)",
      via: "via Centene - Centene Corporation",
      description:
        "You could be the one who changes everything for our 25 million members as an Application Software Developer Intern.\n\nDesign, build, test and maintain scalable and stable off the shelf application or custom built technology solutions to meet business needs.\n\nPosition Purpose:\n• Learn various job functions within the Managed Care industry and explore various career opportunities\n• Apply academic knowledge and learn new skills by contributing to various projects\n• Research various legal, regulatory, and other topics within functional area and industry\n• Attend training and development presentations to enhance professional competencies\n\nLearn about various processes and functions within the Managed Care industry and develop professionally by contributing to projects that support the business.\n\nExperience/Experience:\n\nHealthcare experience a plus. Software development experience. Experience with Java Script. Experience in Web development using HTML, XLM, XSL, XSLT, jQuery, CSS and AJAX... Understanding of Agile methodology.\n\nHigh school diploma or equivalent. Must be enrolled in an undergraduate program at an accredited university or college, preferably in a field related to the hiring department through the internship period.\n\nCentene is an equal opportunity employer that is committed to diversity, and values the ways in which we are different. All qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, disability, veteran status, or other characteristic protected by applicable law",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDS5aKwajwln1eIbfiByOv9QArTMtv_aTLJZJihU4&s",
      extensions: ["16 days ago", "Internship"],
      detected_extensions: {
        posted_at: "16 days ago",
        schedule_type: "Internship",
      },
      job_id:
        "eyJqb2JfdGl0bGUiOiJJbnRlcm4gKEFwcGxpY2F0aW9uIFNvZnR3YXJlIERldmVsb3BlciBTdG9yYWdlIFVuZGVyZ3JhZHVhdGUgLSBTdW1tZXIpIiwiaHRpZG9jaWQiOiJKb1VsN0NXT2JIUGhqOEIzQUFBQUFBPT0iLCJmYyI6IkV2Y0JDcmNCUVUxc2RuSndkR3BDV205UVp6ZHlSVWc1VWt4UU5XWkdkRkl3VVVSWWVsVldWbUpIVFdrek9FOVBjVVE0TFY5d05HcHZWRUZNZEVvNFJqQTNhak5XT0RrMVpURnRXbXB2VUhGdWNuSmphMlppWm01dmFtbElkbWg1VDBvMlVrZElXV0ZVZEU5WldFczNZV2huU0hGYU1XaEhaV28wTTNOMGFGZElUV2N0VEVWR2RXOU1UV3BxZDBJd1ZtOWZWamhaTUVwUVRqTkVXRWs0Y0c5SFNWQllNblpWUWxaZmNFWkxhM0pvWVZCRWJuZFdVRGh0Y2xrd0VoZGpiMDU0V1dGMWNrUmxRMjF4ZEhOUU9VMUxUaTFCZHhvaVFVaFhVMDV0VldOdlREaHNTRzVoUjJwWFdYbG5Selo1T0VzNWNsOUhZelpFWnciLCJmY3YiOiIzIiwiZmNfaWQiOiJmY18zOCIsImFwcGx5X2xpbmsiOnsidGl0bGUiOiJBcHBseSBvbiBDZW50ZW5lIC0gQ2VudGVuZSBDb3Jwb3JhdGlvbiIsImxpbmsiOiJodHRwczovL2pvYnMuY2VudGVuZS5jb20vdXMvZW4vam9iLzEyNTI4NjgvSW50ZXJuLUFwcGxpY2F0aW9uLVNvZnR3YXJlLURldmVsb3Blci1TdG9yYWdlLVVuZGVyZ3JhZHVhdGUtU3VtbWVyP3V0bV9jYW1wYWlnbj1nb29nbGVfam9ic19hcHBseVx1MDAyNnV0bV9zb3VyY2U9Z29vZ2xlX2pvYnNfYXBwbHlcdTAwMjZ1dG1fbWVkaXVtPW9yZ2FuaWMifX0=",
    },
    {
      title: "Intern - Software Development",
      company_name: "NISC",
      location: "St. Louis, MO",
      via: "via LinkedIn",
      description:
        "This position reports to a Software Engineering Team Lead and will collaborate with other software developers. May work with support staff assigned to design business requirements and with quality assurance personnel. This position is responsible for software development and assisting with the maintenance of NISC's Utility, Broadband, Financials, Operations software and/or AppSuite mobile applications.\n\nTo Learn more about NISC's internships, click HERE.\n• Current applications submitted will be under consideration for Summer 2022 (May - August)**\n\nEssential Functions:\n• Performs basic research, design and development of software systems.\n• Researches, analyzes, and resolves basic software maintenance.\n• Assists in the enhancement and/or maintenance of application programs in the business areas listed above within our Application & Platform Division.\n• Follows all established software development methodologies and procedures.\n• Performs quality testing as it relates to both unit and... system integration dependent on the tasks assigned.\n• Reviews and prioritizes assigned change requests.\n• Ensures that all information is appropriately entered and utilized in the iVUE Support tool.\n\nDesired Job Experience:\n• Strong customer orientation.\n• Familiarity with Angular, CSS, Java, J2EE architecture, EJB, RMI, Hibernate, HTML, JSP, XML, SQL, Springboot microservices architecture, and enterprise design patterns.\n• Familiarity with Oracle and/or Progress databases.\n• Familiarity with Linux and Microsoft Windows.\n• Strong problem solving skills and attention to detail.\n• Strong verbal and written, interpersonal, and communication skills.\n• Ability to work independently, as well as in a team environment.\n• Ability to effectively adapt to change.\n• Ability to interact in a positive manner with internal and external contacts.\n• Ability to maintain the highest level of professionalism, ethical behavior, and confidentiality.\n• Commitment to NISC's Statement of Shared Values.\n\nDesired Education and/or Certification(s):\n• High School diploma or equivalency required\n• Pursuing Bachelor's Degree in a computer science related field field\n\nMinimum Physical Requirements:\n\nThe physical demands described here are representative of those that must be met by an employee to successfully perform the essential functions of this position. Reasonable accommodations may be made to enable individuals with disabilities to perform the essential functions. While performing the essential functions of this position, employees must be able to see and communicate. Employees are regularly required to maintain a stationary position, move, and operate computer keyboards or office equipment.\n\nDisclaimer:\n\nManagement may modify this job description by assigning or reassigning duties and responsibilities at any time",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk7bZYCKAirK71MvPj89--wSI3c2SH73wz0VblQYg&s",
      extensions: ["Over 1 month ago", "Internship"],
      detected_extensions: {
        posted_at: "Over 1 month ago",
        schedule_type: "Internship",
      },
      job_id:
        "eyJqb2JfdGl0bGUiOiJJbnRlcm4gLSBTb2Z0d2FyZSBEZXZlbG9wbWVudCIsImh0aWRvY2lkIjoiRVFyMXMzOE51bU1LTmp5Y0FBQUFBQT09IiwiZmMiOiJFc3dCQ293QlFVMXNkbkp3ZEY5TmVsY3pXVlYxWm14dGN6UkVjVTk1VHkxSlNtbERWM0phV2tWV00zVkVTakJyU21kd1NUQlZTamRpVGxkc01rcDFaRmhGUkdwWGNuQlZiVzh3U1hrd1gyVnFZelJhVDNKSVQybEZPVEpQTXpOalgxZE1hbWRzWjNwcWIweHVTWGRXUzBweU1UQndSMjl2WHkxckxVMXdiMFpJZDFwR1NVOUNZVzlsVkhoRGFrWmhTRjhTRjJOdlRuaFpZWFZ5UkdWRGJYRjBjMUE1VFV0T0xVRjNHaUpCU0ZkVFRtMVZaMDFxUkZkUGJFNW9iMUpZV0RGU2NVWnlVVFJUV2xOM1kzcDMiLCJmY3YiOiIzIiwiZmNfaWQiOiJmY180NiIsImFwcGx5X2xpbmsiOnsidGl0bGUiOiJBcHBseSBvbiBMaW5rZWRJbiIsImxpbmsiOiJodHRwczovL3d3dy5saW5rZWRpbi5jb20vam9icy92aWV3L2ludGVybi1zb2Z0d2FyZS1kZXZlbG9wbWVudC1hdC1uaXNjLTI3NTI4MzkwOTM/dXRtX2NhbXBhaWduPWdvb2dsZV9qb2JzX2FwcGx5XHUwMDI2dXRtX3NvdXJjZT1nb29nbGVfam9ic19hcHBseVx1MDAyNnV0bV9tZWRpdW09b3JnYW5pYyJ9fQ==",
    },
    {
      title: "Intern (Software Developer - Undergraduate - Summer)",
      company_name: "Centene",
      location: "St. Louis, MO",
      via: "via Zippia",
      description:
        "Intern (Software Developer - Undergraduate - Summer) - 1252852 Description You could be the one who changes everything for our 25 million members as a Software Developer Intern.\n\nThis position is part of the TruCare platform team.\n\nDesign, build, test and maintain scalable and stable off the shelf application or custom built technology solutions to meet business needs\n\nLearn various job functions within the Managed Care industry and explore various career opportunities\n\nApply academic knowledge and learn new skills by contributing to various projects\n\nResearch various legal, regulatory, and other topics within functional area and industry\n\nAttend training and development presentations to enhance professional competencies\n\nQualifications Learn about various processes and functions within the Managed Care industry and develop professionally by contributing to projects that support the business. Understanding of any of the following: COBOL, JAVA, Angular, JSP, Supertool, PL/SQL, UNIX... shell scripting, C#, ASP.Net, Java Script, Object Oriented Programming and design concepts, XML, SQL, HTML, CSS.\n\nExperience/Experience:\n\nHigh school diploma or equivalent. Must be enrolled in an undergraduate program at an accredited university or college, preferably in a field related to the hiring department through the internship period.Pursuing a Computer Science or related degree\n\nCentene is an equal opportunity employer that is committed to diversity, and values the ways in which we are different. All qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, disability, veteran status, or other characteristic protected by applicable law.\n\nJob: Internships Primary Location: USA-North Carolina-Charlotte Other Locations: USA-Missouri-St. Louis Organization: Corporate Schedule: Full-time",
      extensions: ["3 days ago", "Full-time"],
      detected_extensions: {
        posted_at: "3 days ago",
        schedule_type: "Full-time",
      },
      job_id:
        "eyJqb2JfdGl0bGUiOiJJbnRlcm4gKFNvZnR3YXJlIERldmVsb3BlciAtIFVuZGVyZ3JhZHVhdGUgLSBTdW1tZXIpIiwiaHRpZG9jaWQiOiIwV25xdlJJTnpBYmVKTThwQUFBQUFBPT0iLCJmYyI6IkV1SUJDcUlCUVUxc2RuSndjMWRMUVRaeWFrd3dVMUI0V1hWeGJteDNkazlNTkhobGRIaE9aRlp0U1dkMU9GWjVXbE0wU25semVXZHdWVGRvWWxoVlVISjZXVkp3YUc5YVoxOUVlV1pYUWxGWVpIQTRaazlOTUZoaGIxUlJWbVo0ZVdKME5FeFJVR2hMUzI0ellUTXllRWcyUnpVMU1FdFRaa0kzWkhsSFIxOVBiekZtU3pabGRrZHliRGhKZW1WYU0xbzVRMHBaWkRGd1MyUjNOazFWVUdjeGVUbERaa3gzRWhkamIwNTRXV0YxY2tSbFEyMXhkSE5RT1UxTFRpMUJkeG9pUVVoWFUwNXRWWHBmTkhGVWNYSllkMkpZWTBkeWJURTJaVlZqZWxoWVNtaHpRUSIsImZjdiI6IjMiLCJmY19pZCI6ImZjXzU0IiwiYXBwbHlfbGluayI6eyJ0aXRsZSI6IkFwcGx5IG9uIFppcHBpYSIsImxpbmsiOiJodHRwczovL3d3dy56aXBwaWEuY29tL3NhaW50LWxvdWlzLW1vLWpvYnMvaW50ZXJuc2hpcC1kbHAvP2ZkMmY1YzlkMTA0ZmYxMDFkZWQxNTUyNzFkOTJjNGM5OTBkYzg4YzVcdTAwMjZ1dG1fY2FtcGFpZ249Z29vZ2xlX2pvYnNfYXBwbHlcdTAwMjZ1dG1fc291cmNlPWdvb2dsZV9qb2JzX2FwcGx5XHUwMDI2dXRtX21lZGl1bT1vcmdhbmljIn19",
    },
    {
      title: "Software Engineering Intern",
      company_name: "Equifax",
      location: "St. Louis, MO",
      via: "via LinkedIn",
      description:
        "Who is Equifax?\n\nAt Equifax, we believe knowledge drives progress. As a global data, analytics and technology company, we play an essential role in the global economy by helping employers, employees, financial institutions and government agencies make critical decisions with greater confidence.\n\nWe work to help create seamless and positive experiences during life’s pivotal moments: applying for jobs or a mortgage, financing an education or buying a car. Our impact is real and to accomplish our goals we focus on nurturing our people for career advancement and their learning and development, supporting our next generation of leaders, maintaining an inclusive and diverse work environment, and regularly engaging and recognizing our employees. Regardless of location or role, the individual and collective work of our employees makes a difference and we are looking for talented team players to join us as we help people live their financial best.\n\nAs a Software Engineering Intern, you will... gather requirements, design, develop, perform code reviews, and test components for solutions related to the core systems running several of Equifax’s core lines of business. The Core Software Engineering groups are essential in developing reusable code for data processing and fulfillment systems and products.\n\nThis internship position is responsible to perform general application development activities as an embedded team member of one of our Core Software Engineering delivery teams. Equifax is seeking bright, determined Developer Intern who can thrive in a dynamic environment; someone who is excited about the opportunity to make an immediate impact with their work and bring new and innovative solutions for our customers.\n\nWhat You’ll Do\n• Be part of an Agile team responsible for design and development of platform components of the next generation product and solutions delivery platforms, including: Design, Development, Bug Fixes, Code Review, Testing, and Technical Documentation\n• Develop code with guidance from more senior developers\n• Validating technology capabilities in areas such as performance, scalability, and capability\n• Interface with internal development teams on large-scale, multi-tier, big data systems\n• Play active role in our Communities of Practice and organizing Hackathon(s)\n\nQualifications\n• Currently pursuing a Bachelor's degree in Computer Science or other Technology-related field\n• Graduation date on or before Dec 2023\n• Ability to work on a full-time basis for the entire duration of the internship\n• Junior or senior\n• Opportunities available for Summer 2022\n\nExtra Points for any of the Following\n• Familiarity with OOD/OOP design and patterns, either in the .NET (C#) or Java technology stack\n• Experience with scripting languages like powershell, python\n• Strong analytical, structured problem solving, and decision making abilities\n• Ability to work on a team and independently as needed\n• Ability to adapt to quickly changing project requirements and continuous feedback\n• Familiarity with Agile development practices and good software engineering practices\n• Excellent oral and written communication skills\n\nSuccess Attributes of an Equifax employee; does this describe you?\n• Accountability\n• Bravery\n• Curiosity\n• Collaboration\n• Think and act differently\n• Trust\n• Ownership\n• Decide-Execute-Ship\n\nThe Perks of being an Equifax Intern?\n\nWe offer excellent development opportunities throughout the internship program and offer a dynamic intern orientation on your first day. You will receive exposure across our organization to build your skills and abilities by working on real business problems and solutions.\n\nWe are an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.\n\nIf this sounds like somewhere you want to work, don’t delay, apply today - we’re looking for you!\n\n#earlycareer\n\nPrimary Location:\n\nUSA-St. Louis-Lackland\n\nUSA-St. Louis-2330 Ball\n\nFunction:\n\nFunction - Internships\n\nSchedule:\n\nFull time",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqhCsBcFYe9r-nEPvRgsl2x4bp9C22_xWKvdv23vU&s",
      extensions: ["10 days ago", "Full-time"],
      detected_extensions: {
        posted_at: "10 days ago",
        schedule_type: "Full-time",
      },
      job_id:
        "eyJqb2JfdGl0bGUiOiJTb2Z0d2FyZSBFbmdpbmVlcmluZyBJbnRlcm4iLCJodGlkb2NpZCI6Ik04c2RsbUZMUXVQT2NleWlBQUFBQUE9PSIsImZjIjoiRXN3QkNvd0JRVTFzZG5Kd2RXZDVhSGhqYlVSaFZYQnFRbVIyWVV4cU5EZEJSRTF5TlRGd2MybE5TR2MyT1VRNVZFeGlTWEZDU1ZkdVZYSXpNMVpPYlZwbFJVdExlalkwYlcxSlJsTjFha2huWjFZeFRWSkxPRkZDZGsxTVpYbE1hbnBrYjB0bFJERndWVXAzT0MxT1RsUXpRbnBtUmpsRE9VSnhXVFpRY1ROSlQwaDZZazFZYVZKeFpYWmFhMjlrT0dvU0YyTnZUbmhaWVhWeVJHVkRiWEYwYzFBNVRVdE9MVUYzR2lKQlNGZFRUbTFZYlVGTk4waEZlSFJXY1V4aGNIQXlVM2RXVmxwNlRWSTNaVlZSIiwiZmN2IjoiMyIsImZjX2lkIjoiZmNfNjEiLCJhcHBseV9saW5rIjp7InRpdGxlIjoiQXBwbHkgb24gTGlua2VkSW4iLCJsaW5rIjoiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2pvYnMvdmlldy9zb2Z0d2FyZS1lbmdpbmVlcmluZy1pbnRlcm4tYXQtZXF1aWZheC0yNzUwOTUwNzMxP3V0bV9jYW1wYWlnbj1nb29nbGVfam9ic19hcHBseVx1MDAyNnV0bV9zb3VyY2U9Z29vZ2xlX2pvYnNfYXBwbHlcdTAwMjZ1dG1fbWVkaXVtPW9yZ2FuaWMifX0=",
    },
    {
      title: "2022 Summer Intern: Information Technology",
      company_name: "SPECTRUM",
      location: "St. Louis, MO",
      via: "via Spectrum - Jobs",
      description:
        "At a Glance\n• You’re a motivated rising junior or above / graduate-level student with a 3.0 GPA or higher seeking a degree in one of the following areas listed below from an accredited college or university:\n• Business Administration\n• Computer Information Systems (CIS)\n• Cyber Security\n• Data Science\n• Information Technology\n• Management Information Systems (MIS)\n• Network Engineering\n• Statistics\n• This is a learning-intensive program designed to give you essential business insights and hands-on experience in your field of choice. It’s a full-time, 10-week commitment from June 1, 2022 through August 5, 2022.\n• Benefits include professional development sessions, networking opportunities, and mentorship.\n\nThe Spectrum Internship Experience\nYou have clear aspirations and are seeking a summer internship program that will help you meet them. Find it at Spectrum, named one of the Top 100 Internship Programs in the United States by WayUp.\n\nOur internships are designed to provide:\n•... Opportunities to gain new skills and elevate the ones you already have, all in a robust and forward-thinking business setting.\n• First-rate, hands-on experience in the telecommunications industry.\n• Opportunities to connect you with people who can give you a better understanding of the industry and help you accomplish real goals you can add to your résumé, this includes assigning you a formal mentor and interactions with senior executives.\n\nWhat you can expect in this role\nAs a Spectrum Intern, you’ll be essential to two teams — your respective department and your Intern peer group. Department and team-focused projects account for about 80% of your schedule. You’ll spend the other 20% on professional development sessions and networking activities, including the Kickoff Conference on June 1, webinars, community service, cross-functional project, and final presentations.\n\nInternship responsibilities may include\n• Perform project research using applicable Charter systems (SharePoint, Chalk). Analyze business requirements and translate to IT functional requirements/user stories along with Traceability. Review deliverables created by IT BSAs (Business Systems Analyst) and understand the content significance.\n• Support the financial strategy, planning, and analysis needs of IT, including annual budgeting, quarterly forecasts, justification forms, headcount dashboards, contractor reporting, SOW management, and aggregation/communication to IT leadership.\n• Technical research and documentation into new and existing data stores and API interfaces for a variety of projects in the Agent Portals (Gateway) application space. Review behind the scenes functionality and systems interaction of call center and support tool sets. Analyze desired functionality enhancements against current system capabilities to support Solution Architecture in developing an architectural roadmap.\n• Responsible for translating business strategy and needs into defined projects to ensure alignment between the business and IT. Understand existing and proposed business processes and information system capabilities to assist with planning cross-departmental solutions that will benefit the enterprise.\n• Work with team (or lead segments) of program to identify and intervene with intermediaries that enable theft of services or content. This can include identifying intermediary for different providers, categorizing by type, understanding existing Charter relationship, and defining possible methods of intervention.\n\nPotential titles may include\n• Software Developer\n• Software Engineer\n• Cyber Security Engineer\n• Web Services Developer\n• eCommerce Application Developer\n• Associate Business Analyst\n• Associate Project Manager\n• System Database Administrator\n• Application Developer\n\nHere’s what it takes to get started\n\nRequired qualifications\n• Must be currently enrolled in an accredited College or University completing a Bachelor’s Degree or Advanced Degree\n• Must have at least a 3.0 GPA or greater in current program\n• Authorization to work in the U.S. without restrictions or need for future sponsorship\n• Ability to travel locally to Spectrum Intern development events and activities throughout the program\n\nPreferred qualifications\n• Analytical skills\n• Atlassian Tool Suite (Jira/Confluence)\n• Business Analysis\n• Coding, programming\n• Database query languages\n• Data science and analytics\n• Front end development\n• Organizational skills\n• Oral and written skills\n• Predictive modeling, machine learning\n• Problem solving skills\n• Project and time management skills\n• Proficiency in Microsoft Office: Word, Excel, PowerPoint, Access, Visio\n• Scripting and reporting\n• Software development skills\n• QA Process\n• Technical documentation\n• Technical analytical tools such as VBA, SQL, SAS, Tableau\n• Sharepoint Administration\n• Cyber Security\n• TCP/IP internetworking\n• C, S++, Java, JavaScript, Python, Coding, programming\n• Knowledge of Jenkins, Git 6\n• SDLC\nGGN100 290882 290882BR",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrHuKo1lUo-fSI0gXk0PaXGudVb4OKfeU9K2HS&s=0",
      extensions: ["Over 1 month ago", "Full-time"],
      detected_extensions: {
        posted_at: "Over 1 month ago",
        schedule_type: "Full-time",
      },
      job_id:
        "eyJqb2JfdGl0bGUiOiIyMDIyIFN1bW1lciBJbnRlcm46IEluZm9ybWF0aW9uIFRlY2hub2xvZ3kiLCJodGlkb2NpZCI6Im5GR2Jib3MtMGdRcG45VmNBQUFBQUE9PSIsImZjIjoiRXVJQkNxSUJRVTFzZG5Kd2RFdzVNbGc0ZEhoVGRqVjFVRFo0UlU5NGRraENXRk5ZZWkwMGRIRXdPVFI2Y2t4NFF6Wm1SRE16ZG1OS1gzWTNSRFoxVDBFeWFGbENNSFJhTVcxQlJrTnNlVVYwUW5kZllYTk9PVlJoZDNSd01XSXhSbkZ1Y1U5V1kxTlJTRU5pVjJ0NFZtdE5PVTlWU0VKUVNXZENNbUl4VVdnMGFVdDZja3hMUW5OcldHRmtaR2hhV0RCWWRtWkJNblZvWTFJeFFsaHdla04zTFdWWlR6RjNFaGRqYjA1NFdXRjFja1JsUTIxeGRITlFPVTFMVGkxQmR4b2lRVWhYVTA1dFZubEpMWHBmU1ZGa2QxRlRjSGN3WmxOM1ZFczFablV4Y1ROT1p3IiwiZmN2IjoiMyIsImZjX2lkIjoiZmNfNjkiLCJhcHBseV9saW5rIjp7InRpdGxlIjoiQXBwbHkgb24gU3BlY3RydW0gLSBKb2JzIiwibGluayI6Imh0dHBzOi8vam9icy5zcGVjdHJ1bS5jb20vam9iL3N0LWxvdWlzLzIwMjItc3VtbWVyLWludGVybi1pbmZvcm1hdGlvbi10ZWNobm9sb2d5LzQ2NzMvMTM5NzcxMDc2OTY/dXRtX2NhbXBhaWduPWdvb2dsZV9qb2JzX2FwcGx5XHUwMDI2dXRtX3NvdXJjZT1nb29nbGVfam9ic19hcHBseVx1MDAyNnV0bV9tZWRpdW09b3JnYW5pYyJ9fQ==",
    },
    {
      title: "Software Engineer Intern - Enables (Remote)",
      company_name: "Olive",
      location: "Anywhere",
      via: "via Tarta.ai",
      description:
        "Description\n\nOlive’s AI workforce is built to fix our broken healthcare system by addressing healthcare’s most burdensome issues -- delivering hospitals and health systems increased revenue, reduced costs, and increased capacity\n\nPeople feel lost in the system today and healthcare employees are essentially working in the dark due to outdated technology that creates a lack of shared knowledge and siloed data\n\nOlive is designed to drive connections, shining a new light on the broken healthcare processes that stand between providers and patient care\n\nShe uses AI to reveal life-changing insights that make healthcare more efficient, affordable, and effective\n\nOlive’s vision is to unleash a trillion dollars of hidden potential within healthcare by connecting its disconnected systems\n\nOlive is improving healthcare operations today, so everyone can benefit from a healthier industry tomorrow.\n\nOlive Enables is the company’s central platform, responsible for building products + tools that... support Olive’s solutions and empower them to be 10x more effective\n\nWe are looking for an experienced Product leader who is passionate about building products that customers love and will fundamentally change healthcare and has the ability to lead a highly functioning team of Product Managers through our company vision\n\nYou will have direct responsibility for the oversight and thought leadership of multiple product teams within the Olive organization\n\nYou will collaborate across the organization with Senior Leadership and critical business stakeholders, as well as be responsible for the evolution and optimization of Olive’s product suite.\n\nJob Overview\n\nWithin Olive Enables, the Shiftwork platform is how Olive is built, brought to life, and sustained as she shows up to work every day\n\nThe Shiftwork platform consists of OliveScript, the language in which Olive is written, Orchestration, which is used to schedule and manage Olive, and a variety of other tools and resources which support Olive as she does her job\n\nThe Opportunities for Learning and Development is Front-end development using JavaScript, React, Redux, Sass, and a variety of other frameworks and tools\n\nBack-end development using Javascript, TypeScript, Golang, REST, and a variety of other frameworks and tools\n\nArchitecture and System design patterns.\n\nInternship Dates: May 23, 2022 - July 29, 2022\n\nEssential Duties And Responsibilities\n• Collaborate with Engineers to implement features\n• Ability to meet deadlines and satisfy requirements from other Engineers and Product Management\n• Peer review and code review participation to provide valuable feedback during every step of the development process\n• Produce well-organized, optimized, and documented code\n• Communicate effectively and efficiently with the Apertures team, including Engineers and Product Management\n• Take technical ownership of tasks and successfully work independently\n\nRequirements\n• Degree in progress for CIS, CSE, CS, Engineering\n• JavaScript or TypeScript\n• SQL or other Database experience\n• Strong Communication Skills (verbal, written, listening)\n• Time Management\n• Ability to work independently/team\n• Quick learner\n\nAt Olive, we're committed to growing and empowering an inclusive community within our company and industry\n\nThis is why we hire and cultivate diverse teams of the best and brightest from all backgrounds, experiences, and perspectives across our organization\n\nResearch shows that oftentimes women and other minority groups only apply to open roles if they meet 100% of the listed criteria\n\nOlive encourages everyone — including women, people of color, individuals with disabilities and those in the LGBTQIA+ community — to apply for our available positions, even if they don't necessarily check every box on the job description.\n\nDisclaimer\n\nThis job description is not designed to cover or contain a comprehensive listing of activities, duties or responsibilities that are required of the employee\n\nDuties, responsibilities and activities may change or new ones may be assigned.\n\nThis job description does not constitute a contract of employment and Olive AI, Inc\n\nmay exercise its employment-at-will rights at any time",
      extensions: ["5 days ago", "Work from home", "Internship"],
      detected_extensions: {
        posted_at: "5 days ago",
        schedule_type: "Internship",
        work_from_home: true,
      },
      job_id:
        "eyJqb2JfdGl0bGUiOiJTb2Z0d2FyZSBFbmdpbmVlciBJbnRlcm4gLSBFbmFibGVzIChSZW1vdGUpIiwiaHRpZG9jaWQiOiJvdnNVbG42VzBYLS1UeVNJQUFBQUFBPT0iLCJhcHBseV9saW5rIjp7InRpdGxlIjoiQXBwbHkgb24gVGFydGEuYWkiLCJsaW5rIjoiaHR0cHM6Ly90YXJ0YS5haS9qLzJhRVdpM3dCUFY0MDZsNlhubzRMLXNvZnR3YXJlLWVuZ2luZWVyLWludGVybi1lbmFibGVzLXJlbW90ZS1pbi1zdC1sb3Vpcy1tby1taXNzb3VyaS1hdC1vbGl2ZT91dG1fY2FtcGFpZ249Z29vZ2xlX2pvYnNfYXBwbHlcdTAwMjZ1dG1fc291cmNlPWdvb2dsZV9qb2JzX2FwcGx5XHUwMDI2dXRtX21lZGl1bT1vcmdhbmljIn19",
    },
  ],
  chips: [
    {
      type: "Title",
      param: "job_family_1",
      options: [
        {
          text: "All",
        },
        {
          text: "Software engineer",
          value: "software engineer",
        },
        {
          text: "Software engineering",
          value: "software engineering",
        },
        {
          text: "Associate",
          value: "associate",
        },
        {
          text: "Engineer",
          value: "engineer",
        },
        {
          text: "Engineering",
          value: "engineering",
        },
        {
          text: "Undergraduate",
          value: "undergraduate",
        },
        {
          text: "Computer",
          value: "computer",
        },
        {
          text: "General",
          value: "general",
        },
        {
          text: "Product management",
          value: "product management",
        },
      ],
    },
    {
      type: "Location",
      param: "city",
      options: [
        {
          text: "All",
        },
        {
          text: "St. Louis, MO",
          value: "-Y7t-qm02Idb4Lsiyuo5vg==",
        },
        {
          text: "Edwardsville, IL",
          value: "PVMixNRX34eLUnU9fu8_gg==",
        },
        {
          text: "Maryland Heights, MO",
          value: "iVgUkMMt34cilihF00_fNw==",
        },
        {
          text: "Ballwin, MO",
          value: "ySyI10XU2Ic--76w6ZPRGg==",
        },
        {
          text: "Bridgeton, MO",
          value: "cdZI76kx34ck21s-pOZpaw==",
        },
        {
          text: "Chesterfield, MO",
          value: "4y5BMrUq34fJJxT9LrEiWA==",
        },
        {
          text: "Creve Coeur, MO",
          value: "1Y6DIFct34dAnK150GOJaw==",
        },
        {
          text: "Town and Country, MO",
          value: "lTEkScPS2IewU_TWxmQQBw==",
        },
      ],
    },
    {
      type: "Date posted",
      param: "date_posted",
      options: [
        {
          text: "All",
        },
        {
          text: "Past day",
          value: "today",
        },
        {
          text: "Past 3 days",
          value: "3days",
        },
        {
          text: "Past week",
          value: "week",
        },
        {
          text: "Past month",
          value: "month",
        },
      ],
    },
    {
      type: "Requirements",
      param: "requirements",
      options: [
        {
          text: "All",
        },
        {
          text: "No degree",
          value: "no_degree",
        },
        {
          text: "No experience",
          value: "no_experience",
        },
        {
          text: "Under 3 years of experience",
          value: "years3under",
        },
        {
          text: "3+ years of experience",
          value: "years3plus",
        },
      ],
    },
    {
      type: "Type",
      param: "employment_type",
      options: [
        {
          text: "All",
        },
        {
          text: "Internship",
          value: "INTERN",
        },
        {
          text: "Full-time",
          value: "FULLTIME",
        },
        {
          text: "Part-time",
          value: "PARTTIME",
        },
        {
          text: "Contractor",
          value: "CONTRACTOR",
        },
      ],
    },
    {
      type: "Company type",
      param: "industry.id",
      options: [
        {
          text: "All",
        },
        {
          text: "Information",
          value: "/business/naics2007/51",
        },
        {
          text: "Health Care",
          value: "/business/naics2007/62",
        },
        {
          text: "Manufacturing",
          value: "/business/naics2007/31",
        },
        {
          text: "Computer Services",
          value: "/business/naics2007/5415",
        },
        {
          text: "Finance",
          value: "/business/naics2007/52",
        },
        {
          text: "Consulting",
          value: "/business/naics2007/5416",
        },
        {
          text: "Business Support",
          value: "/business/naics2007/5614",
        },
        {
          text: "Construction",
          value: "/business/naics2007/23",
        },
        {
          text: "Wholesale",
          value: "/business/naics2007/42",
        },
      ],
    },
    {
      type: "Employer",
      param: "organization_mid",
      options: [
        {
          text: "All",
        },
        {
          text: "Lumen",
          value: "/m/07sw45",
        },
        {
          text: "Centene",
          value: "/m/028095t",
        },
        {
          text: "Bayer",
          value: "/m/01snr1",
        },
        {
          text: "SPECTRUM",
          value: "/m/05c51w",
        },
        {
          text: "Cisco",
          value: "/m/0dmtp",
        },
        {
          text: "Enterprise Holdings",
          value: "/m/0qfq7lh",
        },
        {
          text: "Open Learning Exchange",
          value: "/g/11g70bp6vg",
        },
        {
          text: "TIBCO",
          value: "/m/044qc6",
        },
        {
          text: "U.S. Bank",
          value: "/m/02l7_f",
        },
        {
          text: "Affirm",
          value: "/g/11fkl4bl9w",
        },
        {
          text: "Ameren Services Company",
          value: "/m/09n2fpq",
        },
        {
          text: "American Fidelity",
          value: "/m/064lyk1",
        },
        {
          text: "Anthem",
          value: "/m/04xtkp",
        },
        {
          text: "Arup",
          value: "/m/04shpb",
        },
        {
          text: "Ascension",
          value: "/g/11jfc272qc",
        },
        {
          text: "BD",
          value: "/m/02v0s5",
        },
        {
          text: "Clayco",
          value: "/g/1dv4qfmp",
        },
        {
          text: "CrowdStrike",
          value: "/g/11bz0yw54s",
        },
        {
          text: "Dell Technologies",
          value: "/g/11c54ch2jm",
        },
        {
          text: "Equifax",
          value: "/m/03tmwh",
        },
        {
          text: "Fidelis Care",
          value: "/m/0t_cnb6",
        },
        {
          text: "Garmin",
          value: "/m/047lkx",
        },
        {
          text: "General Dynamics Information Technology",
          value: "/m/09msylq",
        },
        {
          text: "Hubbell Incorporated",
          value: "/m/09m7scd",
        },
        {
          text: "Intelligrated, Inc.",
          value: "/m/0_s2jmb",
        },
        {
          text: "Leonardo DRS, Inc.",
          value: "/m/0958p7",
        },
        {
          text: "Momentive",
          value: "/m/04y66l5",
        },
        {
          text: "NISC",
          value: "/m/0_gl9kq",
        },
        {
          text: "Object Computing, Inc. (OCI)",
          value: "/g/11g9mt68d8",
        },
        {
          text: "Resume Library",
          value: "/m/0125jjxn",
        },
        {
          text: "Swank Motion Pictures, Inc.",
          value: "/g/1hft2j8hb",
        },
        {
          text: "The Climate Corporation",
          value: "/m/027qr_n",
        },
        {
          text: "World Wide Technology",
          value: "/m/0fh2yc",
        },
      ],
    },
  ],
}

module.exports = app;
