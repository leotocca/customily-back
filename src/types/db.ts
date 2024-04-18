import { Model } from 'sequelize'

interface Page extends Model {
    title: string;
    images: Array<{X: number; Y: number}>
}

export type { Page }
