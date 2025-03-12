import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GeneralConfigService {
  private configData: any;
  private reloadTime: NodeJS.Timeout | null = null;
  private jwtService : JwtService;

  constructor() {
    this.loadConfig();
    this.watchConfigFile();
  }

  private loadConfig() {
    const fileContent = fs.readFileSync('./src/config.json', 'utf-8');

    this.configData = JSON.parse(fileContent);

    let jwtSecret = this.getConfigData('JWT_SECRET');

    this.jwtService = new JwtService({
      secret: jwtSecret,
    });
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

  async generateAccessAndRefreshJWTToken(payload : any){
    try {

      let [accessTokenExp, refreshTokenExp] = await Promise.all([
        this.getConfigData('accessTokenExp'),
        this.getConfigData('refreshTokenExp'),
      ])

      let accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: accessTokenExp
      })

      let refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: refreshTokenExp
      })

      return {accessToken, refreshToken, accessTokenExp, refreshTokenExp}

    } catch (error) {
      
    }
  }
}
