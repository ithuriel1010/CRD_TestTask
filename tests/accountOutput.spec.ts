import { test } from "@playwright/test";
import { parseJsonFileToAccount } from "../helpers/fileHelper";

test("Account output - correct number of units to sell", async () => {
  const account = await parseJsonFileToAccount(test, "ABC_account.json");
  await account.validateAccountData(test);
});
