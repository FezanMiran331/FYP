import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 20000, // Increase to 10 seconds
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    // Add more providers here if needed
  ],

  callbacks: {
    // Called after sign-in
    async signIn({ user, account, profile }) {
      try {
        await connectDB();

        console.log("SIGNIN CALLBACK:", { user, account, profile });

        const userExists = await User.findOne({ email: user.email });

        if (!userExists) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account?.provider || "unknown", // dynamic provider
          });
          console.log("New user created:", user.email);
        } else if (userExists.provider !== account?.provider) {
          // Update provider if it changed (optional)
          userExists.provider = account?.provider || userExists.provider;
          await userExists.save();
          console.log("User provider updated:", user.email);
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    // Store provider in JWT
    async jwt({ token, user, account }) {
      if (account) token.provider = account.provider;
      return token;
    },

    // Pass provider to session on frontend
    async session({ session, token }) {
      session.user.provider = token.provider;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
