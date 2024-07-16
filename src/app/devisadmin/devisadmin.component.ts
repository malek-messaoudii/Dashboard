import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-devisadmin',
  templateUrl: './devisadmin.component.html',
  styleUrls: ['./devisadmin.component.css']
})
export class DevisadminComponent implements OnInit {

  devisList: any[] = []; // Tableau pour stocker les devis récupérés

  constructor(private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchDevis(); // Appel à la méthode pour récupérer les devis au chargement du composant
  }

  fetchDevis(): void {
    this.http.get<any[]>('http://localhost:4000/devis/getall')
      .subscribe(
        (response) => {
          this.devisList = response; 
        },
        (error) => {
          console.error('Erreur lors de la récupération des devis:', error);
          // Gestion des erreurs
        }
      );
  }

  validerDevis(devisId: string): void {
    this.updateDevisStatus(devisId, 'validé');
  }

  refuserDevis(devisId: string): void {
    this.updateDevisStatus1(devisId, 'refusé');
  }

  programmerrdv(devisId: string): void {
    this.http.put<any>(`http://localhost:4000/devis/programme/${devisId}`, {})
    .subscribe(
      (response) => {
        this.toastr.success('Rendez-vous programmé avec succés.');

      },
      (error) => {
        this.toastr.error('Erreur lors de la programmation du rdv');
      }
    );
  }

  marquerDevisRecu(devisId: string): void {
    this.http.put<any>(`http://localhost:4000/devis/recu/${devisId}`, {})
      .subscribe(
        (response) => {
          this.toastr.success('Devis marqué comme reçu avec succés.');
          console.log('Devis marqué comme reçu:', response);

        },
        (error) => {
          this.toastr.error('Erreur lors du marquage du devis comme reçu:');
          console.error('Erreur lors du marquage du devis comme reçu:', error);
        }
      );
  }

  private updateDevisStatus(devisId: string, newStatus: string): void {
    this.http.put<any>(`http://localhost:4000/devis/valider/${devisId}`, {})
      .subscribe(
        (response) => {
          this.toastr.success('Statut du devis mis à jour avec succès.');
          console.log('Statut du devis mis à jour:', response);
        },
        (error) => {
          this.toastr.error('Erreur lors de la mise à jour du statut du devis.');
          console.error('Erreur lors de la mise à jour du statut du devis:', error);
        }
      );
  }
  private updateDevisStatus1(devisId: string, newStatus: string): void {
    this.http.put<any>(`http://localhost:4000/devis/refuser/${devisId}`, {})
      .subscribe(
        (response) => {
          this.toastr.success('Statut du devis mis à jour avec succès.');
          console.log('Statut du devis mis à jour:', response);
        },
        (error) => {
          this.toastr.error('Erreur lors de la mise à jour du statut du devis.');
          console.error('Erreur lors de la mise à jour du statut du devis:', error);
        }
      );
  }
  
}
