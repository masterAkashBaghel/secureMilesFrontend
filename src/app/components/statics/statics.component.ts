import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-statics',
  standalone: true,
  imports: [],
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.css'], // Fixed typo: styleUrl -> styleUrls
})
export class StaticsComponent implements AfterViewInit {
  // This lifecycle hook ensures the DOM is fully rendered before accessing elements.
  ngAfterViewInit(): void {
    const counters = document.querySelectorAll('.count');
    const speed = 200; // Adjust the speed of the animation (higher = slower)

    counters.forEach((counter: any) => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-count'); // Target number
        const count = +counter.innerText; // Current number

        // Calculate the increment per frame
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment).toString();
          setTimeout(updateCount, 10); // Recursively call with a delay
        } else {
          counter.innerText = target.toString(); // Ensure it matches the target
        }
      };

      updateCount(); // Start the animation
    });
  }
}
