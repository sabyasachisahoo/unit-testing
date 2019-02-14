import { Component, OnInit } from '@angular/core';
import { LinkModel } from '../../model/links-model';
import { LinkService } from '../../services/link.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  public links: LinkModel[];
  public oldLinks: LinkModel[];
  public linkUrl: string = null;

  constructor(private linkService: LinkService ) { }

  ngOnInit() {
    this.links = this.linkService.getLinks();
    this.linkService.fetchLinkFromServer().then((data: LinkModel[]) => {
      this.oldLinks = data;
    });
  }

  addNewLink() {
    this.linkService.addNewLink(this.linkUrl);
    this.linkUrl = null;
  }

  removeLink(index) {
    this.linkService.removeLink(index);
  }


}
