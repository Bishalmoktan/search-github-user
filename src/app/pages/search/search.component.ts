import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../interfaces/user-interface';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { UserIntroComponent } from '../../components/user-intro/user-intro.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatIcon, RouterLink, UserIntroComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router)

  username: string = 'bishalmoktan';
  error!: string;
  user!: UserInterface | null;

  ngOnInit(): void {
    this.searchUser()
  }

  searchUser() {
    this.userService.getPost(this.username).subscribe({
      next: (userInfo) => {
        this.user = userInfo as UserInterface;
        this.error = ''
      },
      error: () => {
        this.user = null;
        this.error = 'User not found'
      },
    });

  }

  onChange(event: Event) {
     this.username = (event.target as HTMLInputElement).value;
  }

  navigate(){
    this.router.navigateByUrl(`user/${this.user?.login}`);
  }
}
