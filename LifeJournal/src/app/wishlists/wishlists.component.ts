import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import {  FormControl } from '@angular/forms';
@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.css']
})
export class WishlistsComponent {

  public WishlistItems?: WishlistItem[];
  public http: HttpClient;
  public Name?: string;
  public Deleted?: boolean;
  public Completed?: boolean;
  public Rank?: number;
  public Categories?: string;
  public Description?: string;
  public toppings = new FormControl();
  /*  public toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];*/
  public toppingList: CategoryTmp[] = [{ id: 1, name: 'padoru' }, { id: 2, name: 'nintendo' }, { id: 3, name: 'zelda' }];

  constructor(http: HttpClient) {
    this.http = http;
  }


  getData() {
    this.http.get<WishlistItem[]>('/WishListService').subscribe(result => {
      this.WishlistItems = result;
    }, error => console.error(error));
  }

  addData() {
    var tmp = new WishlistItem();
    tmp.categories = this.Categories;
    tmp.completed = this.Completed;
    tmp.deleted = this.Deleted;
    tmp.name = this.Name;
    tmp.rank = this.Rank;
    tmp.description = this.Description;

    this.http.post<boolean>('/WishListService', tmp).subscribe(data => {
      if (data)
        this.getData();
    })

  }
  updateData(todoEntry: WishlistItem) {
    this.http.put<any>('/WishListService', todoEntry).subscribe(data => {
      this.getData();
    })
  }

}

export class WishlistItem {
  id: number | undefined
  name: string | undefined;
  deleted: boolean | undefined;
  completed: boolean | undefined;
  rank: number | undefined;
  categories: string | undefined;
  description: string | undefined;
}

export class CategoryTmp {
  id!: number;
  name: string | undefined;
}
