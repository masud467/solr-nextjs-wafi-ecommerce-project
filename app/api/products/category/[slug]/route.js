import { SolrService } from "@/services/solr-service";

export async function GET(req, { params }) {
  try {
    const slug = params.slug;
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 10);

    const result = await SolrService.getProductsByCategory(slug, {
      page,
      pageSize,
    });
    return Response.json(result);
  } catch (error) {
    console.log(`Api error [products/category/${params.slug}]:`, error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
}
