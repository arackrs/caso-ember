import {Component, OnInit} from '@angular/core';
import {BundleItemComponent} from '../../components/bundle-item/bundle-item.component';
import {Bundle} from '../../model/bundle.model';
import {Product} from '../../model/product.model';
import {BundlesService} from '../../services/bundles.service';

@Component({
  selector: 'app-bundles',
  imports: [
    BundleItemComponent
  ],
  templateUrl: './bundles.component.html',
  styleUrl: './bundles.component.css'
})
export class BundlesComponent implements OnInit {
  bundles: Bundle[] = [];
  productsByBundle: { [key: string]: Product[] } = {};

  constructor(private readonly bundlesService: BundlesService) {}

  ngOnInit(): void {
    this.bundlesService.getBundles().subscribe({
      next: (data: Bundle[]): void => {
        this.bundles = data;

        for (let bundle of this.bundles) {
          this.bundlesService.getProductsByBundleId(bundle.id).subscribe(products => {
            const sum = products.reduce((acc, p) => acc + p.price, 0);
            bundle.youSave = parseFloat((sum - bundle.price).toFixed(2));
          });
        }

      },
      error: (error) => {
        console.error('Error fetching bundles:', error);
      }
    });
  }
}
