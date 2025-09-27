// import { SolrService } from "@/services/solr-service";
// import { NextResponse } from "next/server";

// export async function GET(request, { params }) {
//   try {
//     const { slug } = params;
//     const { searchParams } = new URL(request.url);
//     const page = Number(searchParams.get("page")) || 1;
//     const pageSize = Number(searchParams.get("pageSize")) || 10;

//     const result = await SolrService.getCategoriesByProductGroup(slug, {
//       page,
//       pageSize,
//     });
//     return NextResponse(result);
//   } catch (error) {
//     console.error(`Api error [categories for ${params.slug}]:`, error);
//     return NextResponse.json(
//       { error: "Failed to fetch categories" },
//       { status: 500 }
//     );
//   }
// }

// ============================================================================

import { SolrService } from "@/services/solr-service";

export async function GET(req, { params }) {
  try {
    const slug = params.slug;
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 20;

    const result = await SolrService.getCategoriesByProductGroup(slug, { page, pageSize });
    return Response.json(result);
  } catch (err) {
    console.error(`API Error [categories for ${params.slug}]:`, err);
    return new Response(JSON.stringify({ error: "Failed to fetch categories" }), { status: 500 });
  }
}
