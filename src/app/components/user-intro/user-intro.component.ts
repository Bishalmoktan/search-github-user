import { Component, Input, inject } from '@angular/core';
import { UserInterface } from '../../interfaces/user-interface';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { UserFollowersInterface } from '../../interfaces/user-followers-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-intro',
  standalone: true,
  imports: [
    MatIcon,
    CommonModule,

  ],
  templateUrl: './user-intro.component.html',
  styleUrl: './user-intro.component.css',
})
export class UserIntroComponent {
  @Input() user: UserInterface | null = null;
  @Input() error: string | null = null;
  @Input() followers?: UserFollowersInterface[] | null = null;

  private router = inject(Router);

  navigate() {
    this.router.navigateByUrl(`user/${this.user?.login}`);
  }
}
