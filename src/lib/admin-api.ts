import { supabase } from "./supabase";

export async function listRows<T = any>(
  table: string,
  opts: { orderBy?: string; ascending?: boolean } = {},
) {
  let q = supabase.from(table).select("*");
  if (opts.orderBy) q = q.order(opts.orderBy, { ascending: opts.ascending ?? true });
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as T[];
}

export async function getRow<T = any>(table: string, id: string) {
  const { data, error } = await supabase.from(table).select("*").eq("id", id).single();
  if (error) throw error;
  return data as T;
}

export async function createRow<T = any>(table: string, values: Partial<T>) {
  const { data, error } = await supabase.from(table).insert(values).select().single();
  if (error) throw error;
  return data as T;
}

export async function updateRow<T = any>(table: string, id: string, values: Partial<T>) {
  const { data, error } = await supabase
    .from(table)
    .update(values)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as T;
}

export async function deleteRow(table: string, id: string) {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}

/**
 * Upload a file to a Supabase storage bucket and return the public URL.
 */
export async function uploadFile(
  bucket: string,
  path: string,
  file: File,
): Promise<string> {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
