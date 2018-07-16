import {Component, Input, OnInit, ElementRef, ViewChild} from '@angular/core';
import {News} from '../../model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {NewsInfoDto} from '../../dto';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.css']
})
export class ViewNewsComponent implements OnInit {
  @Input() post: News;
  commentForm: FormGroup;
  new = true;
  id: number;
  currentUserJson = JSON.parse(localStorage.getItem('currentUser'));
  @ViewChild('content') content: ElementRef;
  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    if (this.post === undefined) {
      this.route.params.subscribe(
        (params: any) => {
          if (params.hasOwnProperty('id')) {
            this.id = params['id'];
            this.new = false;
            this.newsService.getPostById(this.id).pipe(first()).subscribe((data: NewsInfoDto) => {
              this.post = data.post;
            },
              () => {
              this.router.navigate(['/exception404']);
              });
          }
        });
    }
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
  }

  deletePost(id: number) {
    this.newsService.deletePost(id).pipe(first())
      .subscribe(
        () => {
          this.router.navigate([`/`]);
        },
        error => {
          //sdfsdfefsd
        });
  }

  downloadPdf(){
    // let doc = new jsPDF();
    // let specialElementHandlers = {
    //   '#editor': function (element, renderer) {
    //     return true;
    //   }
    // }
    // let content = this.content.nativeElement;
    // doc.fromHTML(content.innerHTML, 15, 15, {
    //   'width': 190,
    //   'elementHandlers': specialElementHandlers
    // });
    // doc.save(this.post.name.concat(".pdf"));

    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight, "pagesplit: true")
      pdf.save(this.post.name.concat(".pdf")); // Generated PDF
    });

  }

  showEdit(): boolean {
    return (!this.new && this.currentUserJson !== null ?
      ((this.currentUserJson.username === this.post.authorName || this.currentUserJson.userRole === 'ROLE_ADMIN')) : false);
  }

  showAddComment(): boolean {
    return this.currentUserJson !== null && !this.new;
  }

  showComments(): boolean {
    return !this.new;
  }

  showRating(): boolean {
    return this.currentUserJson !== null && !this.new;
  }
}
