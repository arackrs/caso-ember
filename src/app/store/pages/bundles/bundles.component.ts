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
/**
 * @summary Componente encargado de mostrar los bundles disponibles junto con el ahorro estimado ("youSave") por cada uno.
 * @author Jack Arana
 */
export class BundlesComponent implements OnInit {
  /**
   * List of bundles with calculated savings.
   */
  bundles: Bundle[] = [];

  /**
   * Injects the service responsible for fetching bundle data.
   * @param bundlesService Service to retrieve bundles and related products.
   */
  constructor(private readonly bundlesService: BundlesService) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * It fetches the bundles along with the calculated "youSave" value.
   */
  ngOnInit(): void {
    this.bundlesService.getBundlesWithSavings().subscribe({
      next: (data: Bundle[]): void => {
        this.bundles = data;

        // Código anterior para calcular el ahorro directamente en el componente:
        // for (let bundle of this.bundles) {
        //   this.bundlesService.getProductsByBundleId(bundle.id).subscribe(products => {
        //     const sum = products.reduce((acc, p) => acc + p.price, 0);
        //     bundle.youSave = parseFloat((sum - bundle.price).toFixed(2));
        //   });
        // }
      },
      error: (error) => {
        console.error('Error fetching bundles:', error);
      }
    });
  }
}

