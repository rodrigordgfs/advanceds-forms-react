import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qpocdxstmbdmlabuxyfo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwb2NkeHN0bWJkbWxhYnV4eWZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg4NzAxOCwiZXhwIjoxOTk2NDYzMDE4fQ.LML-kQEWBP8JdU2GKNFXw6hFEfKBYhNInpLNV8zDEsY"
);
