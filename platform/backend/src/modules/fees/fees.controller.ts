import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { FeesService } from './fees.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../common/entities/user-account.entity';
import { FeeStatus } from '../../common/entities/fee-invoice.entity';

@Controller({ path: 'fees', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class FeesController {
  constructor(private readonly feesService: FeesService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.STAFF, UserRole.PRINCIPAL, UserRole.PARENT)
  list(@Query('status') status?: FeeStatus, @Query('page') page = 1, @Query('limit') limit = 25) {
    const feeStatus = status as FeeStatus | undefined;
    return this.feesService.list(feeStatus, Number(page), Number(limit));
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  create(
    @Body()
    body: { studentId: string; description: string; amount: number; dueDate: string },
  ) {
    return this.feesService.createInvoice(
      body.studentId,
      body.description,
      body.amount,
      new Date(body.dueDate),
    );
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  update(@Param('id') id: string, @Body() body: { status: FeeStatus }) {
    return this.feesService.updateStatus(id, body.status);
  }
}
