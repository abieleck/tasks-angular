import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatFormFieldModule, MatInputModule,
  MatButtonModule, MatIconModule, MatTooltipModule,
  MatCardModule, MatSelectModule, MatGridListModule,
  MatSnackBarModule
} from '@angular/material';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TasksService } from './tasks.service';
import { MessagesService } from './messages.service';
import { TrelloService } from './trello.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    BrowserAnimationsModule
  ],
  providers: [TasksService, TrelloService, MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
