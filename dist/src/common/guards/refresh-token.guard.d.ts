import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class RefreshTokenGuard implements CanActivate {
    private jwtService;
    private config;
    constructor(jwtService: JwtService, config: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
