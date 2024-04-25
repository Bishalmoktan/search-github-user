import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../interfaces/user-interface';
import { UserIntroComponent } from '../../components/user-intro/user-intro.component';
import { UserFollowersInterface } from '../../interfaces/user-followers-interface';
import { UserFollowersService } from '../../services/user-followers.service';
import { UserRepos } from '../../interfaces/user-repos';
import { UserReposService } from '../../services/user-repos.service';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { DoughnutComponent } from '../../components/doughnut/doughnut.component';

interface Repo {
  stargazers_count: number;
  name: string;
  forks: number;
}

interface RepoData {
  label: string;
  value: number;
}

interface Total {
  stars: Record<number, RepoData>;
  forks: Record<number, RepoData>;
}
@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [UserIntroComponent, PieChartComponent, BarChartComponent, DoughnutComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private userFollowerService = inject(UserFollowersService);
  private userReposService = inject(UserReposService);

  repos: UserRepos[] | null = null;
  user: UserInterface | null = null;
  error: string | null = null;
  userFollowers: UserFollowersInterface[] | null = null;
  languages: Record<
    string,
    { label: string; value: number; stars: number }
  > | null = null;
  stars: RepoData[] = [];
  forks: RepoData[] = [];
  mostPopular: RepoData[] = [];

  ngOnInit(): void {
    const username = this.route.snapshot.params['username'];
    this.userService.getPost(username).subscribe({
      next: (userInfo) => {
        this.user = userInfo as UserInterface;
      },
      error: (error) => {
        this.user = null;
        this.error = error.message;
      },
    });

    this.userFollowerService.getFollowers(username).subscribe({
      next: (followers) => {
        this.userFollowers = followers;
      },
      error: (error) => {
        this.userFollowers = null;
        this.error = error.message;
      },
    });

    this.userReposService.getRepos(username).subscribe({
      next: (userRepos) => {
        this.repos = userRepos;
        // most used languages
        this.languages = this.repos?.reduce<
          Record<string, { label: string; value: number; stars: number }>
        >((total, item) => {
          const { language, stargazers_count } = item;
          if (!language) return total;
          if (!total[language]) {
            total[language] = {
              label: language,
              value: 1,
              stars: stargazers_count,
            };
          } else {
            total[language] = {
              ...total[language],
              value: total[language].value + 1,
              stars: total[language].stars + stargazers_count,
            };
          }
          return total;
        }, {});

        //  most popular
        this.mostPopular = Object.values(this.languages)
          .sort((a, b) => {
            return b.stars - a.stars;
          })
          .map((item) => {
            return { ...item, value: item.stars };
          })
          .slice(0, 5);

        // stars and forks
        let { stars, forks }: Total = this.repos.reduce(
          (total: Total, item: Repo) => {
            const { stargazers_count, name, forks } = item;
            total.stars[stargazers_count] = {
              label: name,
              value: stargazers_count,
            };
            total.forks[forks] = { label: name, value: forks };
            return total;
          },
          {
            stars: {},
            forks: {},
          }
        );

        this.stars = Object.values(stars).slice(-5).reverse();
        this.forks = Object.values(forks).slice(-5).reverse();
        console.log(this.forks);
      },
      error: (error) => {
        this.user = null;
        this.error = error.message;
      },
    });
  }
}
