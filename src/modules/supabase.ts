import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
dotenv.config()

const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SERVICE_KEY as string)

export default supabase

