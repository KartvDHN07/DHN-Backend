import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as crypto from 'crypto'

@Injectable()
export class GeneralConfigService {
  private configData: any;
  private reloadTime: NodeJS.Timeout | null = null;

  constructor() {
    this.loadConfig();
    this.watchConfigFile();
  }

  private loadConfig() {
    const fileContent = fs.readFileSync('./src/config.json', 'utf-8');
    this.configData = JSON.parse(fileContent);
  }

  private watchConfigFile() {
    fs.watch('./src/config.json', () => {
      if (this.reloadTime) {
        clearTimeout(this.reloadTime);
      }

      // Debounce to avoid multiple reloads
      this.reloadTime = setTimeout(() => {
        this.loadConfig();
        this.reloadTime = null;
      }, 3000); // Wait for 3s before reloading
    });
  }

  getConfigData(key : string = 'default') {
    return this.configData?.[key];
  }

  async OTPHashGenerater(userHandle : string){
    try {
      let OTPHashSecret = await this.getConfigData('OTPHashSecret');
    
      let modifiedHandle = userHandle + 'otp/hash' + OTPHashSecret;
    
      const time = Math.floor(Date.now() / 60000); // 1 min time window
    
      // Create HMAC hash
      const hmac = crypto.createHmac('sha256', OTPHashSecret);
      hmac.update(modifiedHandle + time);
      const hash = hmac.digest('hex');
    
      // Extract a 4-digit OTP from hash (using part of the hex)
      const otp = (parseInt(hash.substring(0, 6), 16) % 10000).toString().padStart(4, '0');
    
      return otp;
    } catch (error) {
      console.error("Error generating OTP:", error);
      return null;
    }
  }
}
