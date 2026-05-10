import { expect } from "@playwright/test";
import { Security } from "./security";

export class Account {
  name: string;
  totalAssets: number;
  security: Security[];

  public constructor(
    name: string,
    totalAssets: number,
    securities: Security[],
  ) {
    this.name = name;
    this.totalAssets = totalAssets;
    this.security = securities;
  }

  public async validateAccountData(test: any): Promise<void> {
    return await test.step("Validate account data", async () => {
      for (const security of this.security) {
        await security.validateSecurityOutput(test, this.totalAssets);
      }
      await this.validateTargetPercentage(test);
      await this.validateCurrentPercentage(test);
    });
  }

  public async validateTargetPercentage(test: any): Promise<void> {
    return await test.step("Validate target percentage sum for the account", async () => {
      let totalTargetPercentage = 0;
      for (const security of this.security) {
        totalTargetPercentage += security.target;
      }
      expect.soft(totalTargetPercentage).toBeLessThanOrEqual(100);
    });
  }

  public async validateCurrentPercentage(test: any): Promise<void> {
    return await test.step("Validate current percentage sum for the account", async () => {
      let totalCurrentPercentage = 0;
      for (const security of this.security) {
        totalCurrentPercentage += security.current;
      }
      expect.soft(totalCurrentPercentage).toBeLessThanOrEqual(100);
    });
  }
}
