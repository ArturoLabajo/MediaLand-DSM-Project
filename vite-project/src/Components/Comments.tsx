import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import type { Comment } from "../Film/domain/Comment";
import { commentServiceInstance } from "../Film/infrastructure/Repository";

interface CommentsProps {
  filmId: string;
  session: boolean;
  userId: string | null;
  userName: string | null;
  perfil: string | null;
  idToken: string | null;
}


function Comments({
  filmId,
  session,
  userId,
  userName,
  perfil,
  idToken
}: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadComments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await commentServiceInstance.getByFilmId(filmId);
      setComments(data);
    } catch (error) {
      console.error(error);
      setError("No se pudieron cargar los comentarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!filmId) return;
    loadComments();
  }, [filmId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session || !userId || !idToken) {
      setError("Debes iniciar sesión para comentar");
      return;
    }

    if (!text.trim()) {
      setError("El comentario no puede estar vacío");
      return;
    }

    const authorName = userName || "Usuario";
    const authorPerfil = perfil || "/user1.jpg";

    try {
      setSaving(true);
      setError("");

      await commentServiceInstance.save(
        {
          id: "",
          filmId,
          userId,
          userName: authorName,
          perfil: authorPerfil,
          text: text.trim()
        },
        idToken
      );

      setText("");
      await loadComments();
    } catch (error) {
      console.error(error);
      setError("No se pudo guardar el comentario");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        marginTop: "28px",
        background:
          "linear-gradient(180deg, rgba(36,18,34,0.95) 0%, rgba(20,8,18,0.98) 100%)",
        border: "1px solid rgba(252, 237, 252, 0.12)",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
      }}
    >
      <Accordion flush>
        <Accordion.Item
          eventKey="0"
          style={{
            backgroundColor: "transparent",
            border: "none"
          }}
        >
          <Accordion.Header>
            <div style={{ fontWeight: 700, color: "#1A0317" }}>
              💬 Comentarios ({comments.length})
            </div>
          </Accordion.Header>

          <Accordion.Body
            style={{
              background: "transparent",
              color: "#FCEDFC",
              padding: "24px"
            }}
          >
            {error && (
              <Alert
                variant="danger"
                style={{
                  backgroundColor: "rgba(220, 53, 69, 0.15)",
                  border: "1px solid rgba(220, 53, 69, 0.35)",
                  color: "#ffd7dc"
                }}
              >
                {error}
              </Alert>
            )}

            {session ? (
              <Form onSubmit={handleSubmit} className="mb-4">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px"
                  }}
                >
                  <img
                    src={perfil || "/user1.jpg"}
                    alt="Tu perfil"
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid rgba(252,237,252,0.85)"
                    }}
                  />

                  <Form.Label
                    style={{
                      color: "#FCEDFC",
                      fontWeight: 600,
                      marginBottom: 0
                    }}
                  >
                    Añadir comentario como <strong>{userName}</strong>
                  </Form.Label>
                </div>

                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Escribe lo que te ha parecido esta película..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{
                      backgroundColor: "rgba(252,237,252,0.06)",
                      border: "1px solid rgba(252,237,252,0.14)",
                      color: "#FCEDFC",
                      borderRadius: "14px",
                      padding: "14px"
                    }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  disabled={saving}
                  style={{
                    marginTop: "14px",
                    backgroundColor: "#FCEDFC",
                    color: "#1A0317",
                    border: "none",
                    borderRadius: "999px",
                    padding: "10px 18px",
                    fontWeight: 700
                  }}
                >
                  {saving ? "Publicando..." : "Publicar comentario"}
                </Button>
              </Form>
            ) : (
              <div
                style={{
                  marginBottom: "20px",
                  padding: "14px 16px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(252,237,252,0.06)",
                  border: "1px solid rgba(252,237,252,0.1)",
                  color: "rgba(252,237,252,0.82)"
                }}
              >
                Inicia sesión para escribir un comentario.
              </div>
            )}

            {loading ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Spinner animation="border" size="sm" />
                <span>Cargando comentarios...</span>
              </div>
            ) : comments.length === 0 ? (
              <div
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(252,237,252,0.04)",
                  border: "1px solid rgba(252,237,252,0.08)",
                  color: "rgba(252,237,252,0.75)"
                }}
              >
                Todavía no hay comentarios para esta película.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    style={{
                      backgroundColor: "rgba(252,237,252,0.05)",
                      border: "1px solid rgba(252,237,252,0.1)",
                      borderRadius: "16px",
                      padding: "16px 18px"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "10px"
                      }}
                    >
                      <img
                        src={comment.perfil || "/user1.jpg"}
                        alt={comment.userName}
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "2px solid rgba(252,237,252,0.85)"
                        }}
                      />

                      <span style={{ fontWeight: 700, color: "#FCEDFC" }}>
                        {comment.userName}
                      </span>
                    </div>

                    <p
                      style={{
                        margin: 0,
                        color: "rgba(252,237,252,0.9)",
                        lineHeight: 1.6
                      }}
                    >
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Comments;