import { Injectable } from '@angular/core';
import { LinkModel } from '../model/links-model';

@Injectable({
    providedIn: 'root'
  })
  export class LinkService {
      public links: LinkModel[] = [];

      addNewLink(link: string) {
          this.links.push(new LinkModel(link));
      }

      getLinks() {
          return this.links;
      }

      removeLink(linkIndex) {
          this.links.splice(linkIndex, 1);
      }

      fetchLinkFromServer() {
          return new Promise((res, rej) => {
            setTimeout(() => {
                res(new LinkModel('https://www.youtube.com'));
            }, 2000);
          });
      }
  }