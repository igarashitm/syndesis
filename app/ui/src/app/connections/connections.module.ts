import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { TagInputModule } from 'ngx-chips';

import { SyndesisVendorModule } from '@syndesis/ui/vendor.module';
import { SyndesisCommonModule } from '../common/common.module';
import { PatternflyUIModule } from '../common/ui-patternfly/ui-patternfly.module';
import { ConnectionsCreatePage } from './create-page/create-page.component';
import { ConnectionsConnectionBasicsComponent } from './create-page/connection-basics/connection-basics.component';
import { ConnectionsConfigureFieldsComponent } from './create-page/configure-fields/configure-fields.component';
import { ConnectionsReviewComponent } from './create-page/review/review.component';
import { ConnectionsCancelComponent } from './create-page/cancel.component';
import { ConnectionsListPage } from './list-page/list-page.component';
import { ConnectionsListComponent } from './list/list.component';
import { CurrentConnectionService } from './create-page/current-connection';
import { ConnectionDetailPageComponent } from './detail-page/detail-page.component';
import { ConnectionDetailBreadcrumbComponent } from './detail-page/breadcrumb.component';
import { ConnectionDetailInfoComponent } from './detail-page/info.component';
import { ConnectionDetailConfigurationComponent } from './detail-page/configuration.component';
import { ConnectionConfigurationService } from './common/configuration/configuration.service';
import { ConnectionConfigurationValidationComponent } from './common/configuration/validation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    PatternflyUIModule,
    RouterModule,
    SyndesisCommonModule,
    TagInputModule,
    SyndesisVendorModule
  ],
  declarations: [
    ConnectionsCreatePage,
    ConnectionsConnectionBasicsComponent,
    ConnectionsConfigureFieldsComponent,
    ConnectionsReviewComponent,
    ConnectionsCancelComponent,
    ConnectionsListPage,
    ConnectionsListComponent,
    ConnectionDetailPageComponent,
    ConnectionDetailBreadcrumbComponent,
    ConnectionDetailInfoComponent,
    ConnectionDetailConfigurationComponent,
    ConnectionConfigurationValidationComponent
  ],
  exports: [ConnectionsListComponent],
  providers: [CurrentConnectionService, ConnectionConfigurationService]
})
export class ConnectionsModule {}
