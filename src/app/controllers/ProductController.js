class ProductController {
  async store(request, reponse) {
    return reponse.status(201).jsonn({ ok: true });
  }
}

export default new ProductController();
