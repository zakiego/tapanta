import OctokitClient from "./octokit";

export class githubAct {
  static async getShaContent(filename: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resp: any = await OctokitClient.rest.repos.getContent({
        owner: "zakiego",
        repo: "act-elgharantaly-quotes",
        path: filename,
      });

      return resp.data.sha;
    } catch (error) {
      return null;
    }
  }

  static async isExist(filename: string) {
    const sha = await this.getShaContent(filename);

    return sha ? true : false;
  }

  static toBase64(content: string) {
    return Buffer.from(content).toString("base64");
  }

  static async uploadFile(filepath: string, content: string) {
    const { data } = await OctokitClient.rest.repos.createOrUpdateFileContents({
      owner: "zakiego",
      repo: "act-elgharantaly-quotes",
      path: filepath,
      message: `Add: ${filepath.split("/")[1]}`,
      content: this.toBase64(content),
    });

    const url = data.content?.html_url;

    return url;
  }
}
