import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ceinaodfyrfmludyrzux.supabase.co";
const supabaseKey = "sb_publishable_0m2o14bLlxce1ubgtdsTNA_ROym7tEr";

export const supabase = createClient(supabaseUrl, supabaseKey);
