import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaterialService, MaterialInstance } from '../shared/classes/material.service';
import { OrderService } from './order.service';
import { OrderPosition } from '../shared/interfaces';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef;
  isRoot: boolean;
  modal: MaterialInstance;

  constructor(private router: Router,
              private order: OrderService) { }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {this.isRoot = this.router.url === '/order';}
    })
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition);
  }

  open() {
    this.modal.open();
  }

  cancel() {
    this.modal.close();
  }

  submit() {
    this.modal.close();
  }

}
