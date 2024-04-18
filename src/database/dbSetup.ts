import { Sequelize, DataTypes } from 'sequelize'
import type { Page } from '../types/db'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
})

export const db: DB = {} as DB

const PageModel = sequelize.define<Page>('Page', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    images: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('images');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(val) {
            this.setDataValue('images', JSON.stringify(val));
        },
    }
})

db.Page = PageModel

interface DB {
    Page: typeof PageModel
}

// THIS FUNCTION WILL CREATE DUMMY DATA IN DATABASE TABLE
export async function setupDB() {
    try {
        await sequelize.sync({ force: true })
        await db.Page.create({ "title":"3 Overlapping Images","images":[{"X":100,"Y":100},{"X":200,"Y":150},{"X":300,"Y":250}]} )
        await db.Page.create({ "title":"Test","images":[{"X":100,"Y":100},{"X":200,"Y":150},{"X":300,"Y":250}]} )
        await db.Page.create({ "title":"Different test","images":[{"X":100,"Y":100},{"X":200,"Y":150},{"X":300,"Y":250}]} )
    } catch (error) {
        console.error(error)
    }
}
