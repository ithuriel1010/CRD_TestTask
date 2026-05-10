import { test } from "@playwright/test";
import { parseJsonFileToAccount } from "../helpers/fileHelper";

test("Validate account data", async () => {
  const account = await parseJsonFileToAccount(test, "ABC_account.json");
  await account.validateAccountData(test);
});
