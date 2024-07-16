import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../promotion.service';
import { Promotion } from '../models/promotion.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promotionsadmin',
  templateUrl: './promotionsadmin.component.html',
  styleUrls: ['./promotionsadmin.component.css']
})
export class PromotionsadminComponent implements OnInit {
  promotions: Promotion[] = [];
  newPromotion: Promotion = { _id: '', price: 0, description: '', mois:''};


  months: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  constructor(private promotionService: PromotionService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchPromotions();
  }

  fetchPromotions(): void {
    this.promotionService.getAllPromotions().subscribe(data => {
      this.promotions = data;
    });
  }

  addPromotion(): void {
    this.promotionService.addPromotion(this.newPromotion).subscribe(data => {
      this.promotions.push(data);
      this.newPromotion = { _id: '', price: 0, description: '', mois:'' };
      this.toastr.success('Promotion ajoutée avec succés.');
    });
  }

  deletePromotion(id: string): void {
    this.promotionService.deletePromotion(id).subscribe(
      (res) => {
        console.log('Promotion deleted successfully');
        this.toastr.success('Promotion supprimée avec succés.');
        this.fetchPromotions(); // Refresh the list after deletion
      },
      (err) => {
        console.error('Error deleting promotion:', err);
      }
    );
  }
}
