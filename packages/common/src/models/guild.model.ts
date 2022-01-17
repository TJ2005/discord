/* eslint-disable spaced-comment */
import { Schema, Document as MongooseDocument } from 'mongoose'
import { SettingCurrency, SettingPlatform, SettingPriceClass, SettingTheme } from '..'


// ===== ARRAY CONSTANTS ===== //


// ===== HELPER TYPES ===== //


// ===== EXPORT TYPES ===== //

/** A reduced type to use internally */
export type GuildDataType = {
  _id: Schema.Types.Long
  sharder: Schema.Types.Long
  channel: Schema.Types.Long | null
  webhook: string | null
  role: Schema.Types.Long | null
  settings: number
  filter: number
  tracker: number
}

/** The user mongoose object, muteable and saveable */
export type GuildType = GuildDataType & MongooseDocument<any, {}>

/** The sanitized version of the data, gets served out by the api */
export type SanitizedGuildType = {
  id: Schema.Types.Long
  sharder: Schema.Types.Long
  channel: Schema.Types.Long | null
  webhook: string | null
  role: Schema.Types.Long | null
  settings: number
  filter: number
  tracker: number

  theme: SettingTheme<any>
  currency: SettingCurrency<any>
  price: SettingPriceClass<any>
  react: boolean
  trashGames: boolean
  language: string
  platformsRaw: number
  platformsList: SettingPlatform<any>[]
  beta: boolean
}


// ===== MONGO SCHEMA ===== //

export const GuildSchema = new Schema({
  _id: Schema.Types.Long,
  sharder: Schema.Types.Long,
  channel: Schema.Types.Long, // nullable
  webhook: String, // nullable
  role: Schema.Types.Long, // nullable
  settings: Number,
  filter: Number,
  tracker: Number
}, { collection: 'guilds' })