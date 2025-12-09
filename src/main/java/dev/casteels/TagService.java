package dev.casteels;

import io.quarkiverse.roq.frontmatter.runtime.model.DocumentPage;
import io.quarkiverse.roq.frontmatter.runtime.model.RoqCollections;
import io.quarkus.qute.TemplateExtension;
import io.vertx.core.json.JsonArray;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.*;

@ApplicationScoped
public class TagService {

    @TemplateExtension(namespace = "tags")
    public static List<TagInfo> all(RoqCollections collections) {
        Map<String, Integer> tagCounts = new HashMap<>();

        var posts = collections.get("posts");
        if (posts != null) {
            for (DocumentPage post : posts) {
                JsonArray tagsArray = post.data().getJsonArray("tags");
                if (tagsArray != null) {
                    for (int i = 0; i < tagsArray.size(); i++) {
                        String tag = tagsArray.getString(i);
                        tagCounts.merge(tag, 1, Integer::sum);
                    }
                }
            }
        }

        return tagCounts.entrySet().stream()
                .map(e -> new TagInfo(e.getKey(), e.getValue()))
                .sorted((a, b) -> a.name.compareToIgnoreCase(b.name))
                .toList();
    }

    @TemplateExtension(namespace = "tags")
    public static List<DocumentPage> byName(RoqCollections collections, String tagName) {
        List<DocumentPage> result = new ArrayList<>();

        var posts = collections.get("posts");
        if (posts != null) {
            for (DocumentPage post : posts) {
                JsonArray tagsArray = post.data().getJsonArray("tags");
                if (tagsArray != null) {
                    for (int i = 0; i < tagsArray.size(); i++) {
                        String tag = tagsArray.getString(i);
                        if (tag.equalsIgnoreCase(tagName)) {
                            result.add(post);
                            break;
                        }
                    }
                }
            }
        }

        return result;
    }

    public static class TagInfo {
        private final String name;
        private final int count;
        private final String slug;

        public TagInfo(String name, int count) {
            this.name = name;
            this.count = count;
            this.slug = slugify(name);
        }

        public String getName() {
            return name;
        }

        public int getCount() {
            return count;
        }

        public String getSlug() {
            return slug;
        }

        private static String slugify(String input) {
            return input.toLowerCase()
                    .replaceAll("[^a-z0-9\\s-]", "")
                    .replaceAll("\\s+", "-")
                    .replaceAll("-+", "-")
                    .replaceAll("^-|-$", "");
        }
    }
}

