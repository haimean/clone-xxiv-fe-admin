import { BaseApi } from "~/core/api";

export default class AuthApi extends BaseApi {
  async forgotPassword(email: string) {
    return await this.axios.post("/auth/reset-password", {
      email,
    });
  }
  async resetPassword(newPassword: string, resetPasswordToken: string) {
    return await this.axios.patch(
      "/reset-password",
      {
        newPassword,
      },
      {
        headers: { Authorization: `Bearer ${resetPasswordToken}` },
      }
    );
  }
}