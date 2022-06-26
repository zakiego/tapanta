import { Octokit } from "octokit";

export const OctokitClient = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

export default OctokitClient;
