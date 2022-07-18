import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from "./pages/home/home.module";

import { ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from './pages/comments/comments.component';
import { CommentDetailComponent } from './pages/comment-detail/comment-detail.component';
import { CommentSearchComponent } from './pages/comment-search/comment-search.component';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

/*
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
*/

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    CommentDetailComponent,
    CommentSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HomeModule,
    

    ReactiveFormsModule
    
    /*
    // Remove when using real server
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false })
    */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

