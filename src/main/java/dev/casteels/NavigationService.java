package dev.casteels;

import io.quarkiverse.roq.frontmatter.runtime.model.DocumentPage;
import io.quarkiverse.roq.frontmatter.runtime.model.Page;
import io.quarkiverse.roq.frontmatter.runtime.model.RoqCollections;
import io.quarkus.qute.TemplateExtension;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class NavigationService {

    @TemplateExtension(namespace = "nav")
    public static DocumentPage prevPost(RoqCollections collections, Page currentPage) {
        var posts = collections.get("posts");
        if (posts == null) {
            return null;
        }

        var postList = new ArrayList<>(posts);
        var currentUrl = currentPage.url().toString();

        for (int i = 0; i < postList.size(); i++) {
            if (postList.get(i).url().toString().equals(currentUrl)) {
                if (i > 0) {
                    return postList.get(i - 1);
                }
                return null;
            }
        }
        return null;
    }

    @TemplateExtension(namespace = "nav")
    public static DocumentPage nextPost(RoqCollections collections, Page currentPage) {
        var posts = collections.get("posts");
        if (posts == null) {
            return null;
        }

        List<DocumentPage> postList = new ArrayList<>(posts);

        var currentUrl = currentPage.url().toString();

        for (int i = 0; i < postList.size(); i++) {
            if (postList.get(i).url().toString().equals(currentUrl)) {
                if (i < postList.size() - 1) {
                    return postList.get(i + 1);
                }
                return null;
            }
        }
        return null;
    }
}

