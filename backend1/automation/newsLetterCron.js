import cron from "node-cron";
import { Job } from "../models/jobSchema.js";
import  User  from "../models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const newsLetterCron = () => {
  cron.schedule('0 0 * * *', async () => {

    console.log("Running Cron Automation");
    const jobs = await Job.find({ newsLettersSent: false });
    for (const job of jobs) {
      try {
        const filteredUsers = await User.find({
          $or: [
            { "niches.firstNiche": job.jobNiche },
            { "niches.secondNiche": job.jobNiche },
            { "niches.thirdNiche": job.jobNiche },
          ],
        });
        for (const user of filteredUsers) {
          const subject = `Hot Job Alert: ${job.title} Opportunity in ${job.jobNiche}`;

const message = `Hi ${user.name},

We’re excited to share a new opportunity that aligns with your professional interests. A position for **${job.title}** at **${job.companyName}** has just been posted, and they’re looking to hire immediately.

Here are the job details:
- Position: ${job.title}
- Company: ${job.companyName}
- Location: ${job.location}
- Salary: ${job.salary}

Opportunities like this don’t last long, so we encourage you to apply as soon as possible.

As always, we're here to support you in your career journey.

Warm regards,  
NextHire Team
`;
          sendEmail({
            email: user.email,
            subject,
            message,
          });
        }
        job.newsLettersSent = true;
        await job.save();
      } catch (error) {
        console.log("ERROR IN NODE CRON CATCH BLOCK");
        return next(console.error(error || "Some error in Cron."));
      }
    }
  });
};