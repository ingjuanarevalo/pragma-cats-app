import { Component, OnInit } from '@angular/core';
import { Observable, firstValueFrom, forkJoin } from 'rxjs';
import { Cat } from 'src/app/models/cat.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.page.html',
  styleUrls: ['./cats.page.scss']
})
export class CatsPage implements OnInit {
  isLoadingCats = true;
  cats: Array<Cat> = [];

  constructor(private api: ApiService, private toast: ToastService) {}

  ngOnInit(): void {
    this.getCats();
  }

  async getCats(): Promise<void> {
    try {
      const breedsResponse: Array<any> = await firstValueFrom(this.api.getBreeds());
      this.cats = breedsResponse.map((cat) => ({
        id: cat.id,
        breedName: cat.name,
        origin: cat.origin,
        affectionLevel: cat.affection_level,
        intelligence: cat.intelligence,
        referenceImageId: cat.reference_image_id,
        imageUrl: ''
      }));

      const imagesRequests: Array<Observable<any>> = [];
      this.cats.forEach((cat) => {
        if (!cat.referenceImageId) return;
        imagesRequests.push(this.api.getImageById(cat.referenceImageId));
      });
      const imagesResults = await firstValueFrom(forkJoin(imagesRequests));
      this.cats.forEach((cat) => {
        const referenceImageId = cat.referenceImageId;
        const imageFound = imagesResults.find((result) => result.id === referenceImageId);
        if (!imageFound) return;
        cat.imageUrl = imageFound.url;
      });
      this.isLoadingCats = false;
    } catch (error) {
      this.isLoadingCats = false;
      this.toast.presentErrorToast('Hubo un error consultando listado de gatos');
    }
  }
}
