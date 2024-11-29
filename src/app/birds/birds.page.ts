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
  currentHowl: Howl | null = null;
  isPlaying: boolean = false;
  progress: number = 0;
  duration: string = '0:00';
  currentTime: string = '0:00';

  constructor(private birdService: BirdService) {}

  ngOnInit() {
    this.birdService.getBirds().subscribe(
      (data: any) => {
        if (data && data.recordings) {
          this.birds = data.recordings.map((bird: any) => ({
            ...bird,
            howl: null,
            isPlaying: false,
            progress: 0,
            duration: '0:00',
            currentTime: '0:00',
          }));
        } else {
          console.error('No se encontraron grabaciones');
        }
      },
      (error) => {
        console.error('Error al cargar las grabaciones:', error);
      }
    );
  }

  formatTime(seconds: number): string {
    if (!isFinite(seconds)) {
      return '0:00';
    }
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  playSound(bird: any) {
    if (bird.howl) {
      if (!bird.isPlaying) {
        bird.howl.play();
        bird.isPlaying = true;
        this.updateProgress(bird);
      }
      return;
    }

    bird.howl = new Howl({
      src: [bird.file],
      html5: true,
      onload: () => {
        bird.duration = this.formatTime(bird.howl?.duration() ?? 0);
      },
      onplay: () => {
        bird.isPlaying = true;
        this.updateProgress(bird);
      },
      onend: () => {
        bird.isPlaying = false;
        this.resetProgress(bird);
      },
      onpause: () => {
        bird.isPlaying = false;
      },
      onstop: () => {
        bird.isPlaying = false;
        this.resetProgress(bird);
      },
      onloaderror: (id, err) => {
        console.error(`Error al cargar el audio para ${bird.file}:`, err);
      },
      onplayerror: (id, err) => {
        console.error(`Error al reproducir el audio para ${bird.file}:`, err);
        bird.howl?.stop();
      },
    });

    bird.howl.play();
  }

  pauseSound(bird: any) {
    if (bird.howl && bird.isPlaying) {
      bird.howl.pause();
      bird.isPlaying = false;
    }
  }

  stopSound(bird: any) {
    if (bird.howl) {
      bird.howl.stop();
      bird.isPlaying = false;
      this.resetProgress(bird);
    }
  }

  updateProgress(bird: any) {
    if (bird.howl && bird.isPlaying) {
      const seek = bird.howl.seek() as number;
      bird.progress = (seek / bird.howl.duration()) * 100;
      bird.currentTime = this.formatTime(seek);

      setTimeout(() => {
        this.updateProgress(bird);
      }, 1000);
    }
  }

  resetProgress(bird: any) {
    bird.progress = 0;
    bird.currentTime = '0:00';
    bird.duration = bird.howl ? this.formatTime(bird.howl.duration()) : '0:00';
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/default-placeholder.png';
  }
}
