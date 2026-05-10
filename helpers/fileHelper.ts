import fs from "fs";
import path from "path";
import { Security } from "../objects/security.js";
import { Account } from "../objects/account.js";

export async function parseJsonFileToAccount(
  test: any,
  filePath: string,
): Promise<Account> {
  return await test.step("Read file " + filePath, async () => {
    try {
      const absolutePath = path.resolve(filePath);
      const fileContent = fs.readFileSync(absolutePath, "utf-8");
      const jsonData = JSON.parse(fileContent);
      const accountData = jsonData.account;
      const securities = accountData.security.map(
        (sec: any) =>
          new Security(
            sec.name,
            sec.target,
            sec.current,
            sec.targetVariance,
            sec.unitPrice,
            sec.output,
          ),
      );

      return new Account(accountData.name, accountData.totalAssets, securities);
    } catch (error) {
      throw new Error(`Failed to parse JSON file at ${filePath}: ${error}`);
    }
  });
}
