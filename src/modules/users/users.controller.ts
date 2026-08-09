import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/enums';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdateCustomerProfileDto } from './dtos/update-customer-profile.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ─── Profile Routes ──────────────────────────────────────────────────

  @Get('/profile')
  async getProfile(@GetUser('sub') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Patch('/profile')
  async updateProfile(
    @GetUser('sub') userId: string,
    @Body() updateProfileDto: UpdateCustomerProfileDto,
  ) {
    return this.usersService.updateProfile(userId, updateProfileDto);
  }

  @Post('/profile/photo')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadProfilePhoto(
    @GetUser('sub') userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp|gif)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.usersService.uploadProfilePhoto(userId, file);
  }

  // ─── Wallet ──────────────────────────────────────────────────────────

  @Get('/wallet')
  async getWalletSummary(@GetUser('sub') userId: string) {
    return this.usersService.getWalletSummary(userId);
  }

  // ─── Booking Summary ─────────────────────────────────────────────────

  @Get('/bookings/summary')
  async getBookingSummary(@GetUser('sub') userId: string) {
    return this.usersService.getBookingSummary(userId);
  }

  // ─── Soft Delete Account ─────────────────────────────────────────────

  @Delete('/account')
  async deleteAccount(@GetUser('sub') userId: string) {
    return this.usersService.deleteAccount(userId);
  }

  // ─── Admin Routes ────────────────────────────────────────────────────

  @Roles(UserRole.ADMIN)
  @Get('/')
  async getAllUsers(@Query() paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    return this.usersService.getAllUsers(page, limit);
  }

  @Roles(UserRole.ADMIN)
  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Roles(UserRole.ADMIN)
  @Patch('/:id')
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserById(id, updateUserDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete('/:id')
  async deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
