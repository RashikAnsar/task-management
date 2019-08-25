import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.singIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() req) {
        console.log(req);
    }
}
