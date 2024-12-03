import { Component, OnInit } from '@angular/core';
import { BirdService } from '../bird.service';
import { Howl } from 'howler';

@Component({
  selector: 'app-birds',
  templateUrl: './birds.page.html',
  styleUrls: ['./birds.page.scss'],
})
export class BirdsPage implements OnInit {
  birds: any[] = [];
  placeholderImage = 'https://via.placeholder.com/80?text=Ave';

  constructor(private birdService: BirdService) {}

  ngOnInit() {
    this.loadBirds();
  }

  private loadBirds() {
    this.birdService.getBirds().subscribe(
      (data: any) => {
        if (data?.recordings) {
          this.birds = data.recordings.map((bird: any) => this.initializeBird(bird));
        } else {
          console.error('No se encontraron grabaciones');
        }
      },
      (error) => console.error('Error al cargar las grabaciones:', error)
    );
  }

  private initializeBird(bird: any) {
    return {
      ...bird,
      howl: null,
      isPlaying: false,
      progress: 0,
      duration: '0:00',
      currentTime: '0:00',
    };
  }

  formatTime(seconds: number): string {
    if (!isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  playSound(bird: any) {
    if (!bird.howl) {
      bird.howl = this.createHowl(bird);
    }
    bird.howl.play();
  }

  pauseSound(bird: any) {
    bird.howl?.pause();
  }

  stopSound(bird: any) {
    bird.howl?.stop();
    this.resetProgress(bird);
  }

  private createHowl(bird: any): Howl {
    return new Howl({
      src: [bird.file],
      html5: true,
      onload: () => (bird.duration = this.formatTime(bird.howl?.duration() ?? 0)),
      onplay: () => {
        bird.isPlaying = true;
        this.updateProgress(bird);
      },
      onpause: () => (bird.isPlaying = false),
      onstop: () => {
        bird.isPlaying = false;
        this.resetProgress(bird);
      },
      onend: () => {
        bird.isPlaying = false;
        this.resetProgress(bird);
      },
    });
  }

  private updateProgress(bird: any) {
    if (bird.howl?.playing()) {
      const seek = bird.howl.seek() as number;
      bird.progress = (seek / bird.howl.duration()) * 100;
      bird.currentTime = this.formatTime(seek);
      setTimeout(() => this.updateProgress(bird), 1000);
    }
  }

  private resetProgress(bird: any) {
    bird.progress = 0;
    bird.currentTime = '0:00';
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = this.placeholderImage;
  }
}
