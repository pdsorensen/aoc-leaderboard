import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import fetch from "node-fetch";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  let jsonPath = process.env.JSON_PATH
  let cookie = process.env.COOKIE

  let response = await fetch(
    `https://adventofcode.com/2020/leaderboard/private/view/${jsonPath}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Cookie: `session=${cookie}`,
      },
      redirect: "follow",
    }
  );

  let data = await response.json();

  context.res = {
    body: data,
  };
};

export default httpTrigger;
