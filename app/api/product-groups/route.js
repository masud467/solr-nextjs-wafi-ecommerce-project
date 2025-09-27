// import { SolrService } from "@/services/solr-service";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const page = Number(searchParams.get("page")) || 1;
//     const pageSize = Number(searchParams.get("pageSize")) || 10;

//     const result = await SolrService.getProductGroups({ page, pageSize });
//     return NextResponse(result);
//   } catch (error) {
//     console.error("Api error from product-groups:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch product groups" },
//       { status: 500 }
//     );
//   }
// }

// ============================================================

import { SolrService } from "@/services/solr-service";

export async function GET() {
  try {
    const result = await SolrService.getProductGroups({ pageSize: 20 });
    return Response.json(result);
  } catch (err) {
    console.error("API Error [product-groups]:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch product groups" }), { status: 500 });
  }
}
