import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/User.model";


export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials: any) {
                await dbConnect();

                const { email, password } = credentials;

                // validation
                if (!email || !password) {
                    throw new Error("Email and password are required.");
                }

                // check user
                const user = await userModel.findOne({ email }).lean();
                if (!user) {
                    throw new Error("User not found.");
                }

                // compare password
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    throw new Error("Invalid password.");
                }

                // return data inside the JWT
                return {
                    id: user._id.toString(),
                    email: user.email,
                    userName: user.userName,
                };
            },
        }),
    ],

    pages: {
        signIn: "/login", // optional
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    email: token.email as string,
                    userName: token.userName as string,
                };
            }
            return session;
        },
    },
};


