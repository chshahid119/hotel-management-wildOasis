import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zxpaxwzbcylqriumgaao.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4cGF4d3piY3lscXJpdW1nYWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0NzU0NjUsImV4cCI6MjA0MzA1MTQ2NX0.gk3en_N2QSsNw0ukXMVaMjNsRCIQwfv0_yRfNOCVYWI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
