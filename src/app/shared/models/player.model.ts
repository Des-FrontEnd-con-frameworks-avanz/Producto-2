export interface Player {
  id: number;
  nombre: string;
  apellidos: string;
  posicion: 'Base' | 'Escolta' | 'Alero' | 'Ala-Pívot' | 'Pívot';
  edad: number;
  altura: string;
  peso: string;
  experiencia: string;
  precio: number;
  fotoUrl?: string;
  videoUrl?: string;
  posterUrl?: string;
  descripcion?: string;
}
